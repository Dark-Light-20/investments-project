import azure.functions as func

import os
from io import BytesIO
from re import search, findall

from fitz import open  # PyMuPDF
import httpx
from bs4 import BeautifulSoup

from models.fic import FIC

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# Constants
ranges = ["1", "7", "30", "90", "180", "365"]
fic_data_url = os.getenv("FIC_DATA_URL")


@app.route(route="rates", methods=["POST"])
async def rates(req: func.HttpRequest) -> func.HttpResponse:
    fund_name = req.get_json().get('fund_name')

    async with httpx.AsyncClient() as client:
        # Fetch the Bancolombia website
        response = await client.get(fic_data_url)

        if response.status_code == 200:
            # Search for the PDF document URL
            pdf_link = BeautifulSoup(response.text, "html.parser").find(
                "section", id="CheckListModule").find("a").get("href")
        else:
            return func.HttpResponse(
                "Failed to fetch the Bancolombia website",
                status_code=400,
            )

        # Fetch the PDF document
        response = await client.get(pdf_link)

        if response.status_code == 200:
            # Open the PDF file
            pdf_bytes = BytesIO(response.content)
            document = open(stream=pdf_bytes, filetype="pdf")

            # Search fund name in the document to extract data
            for page in document:
                text = page.get_text()
                if fund_name in text:
                    break

            # Search fund rates data
            text = text[text.find(fund_name)+len(fund_name):]
            match = search(r"[a-zA-Z]", text)
            fund_data = text[:match.start()]

            # Ignore invalid values and ignore fund balances
            fund_rates_data = findall(r"-?\d+\.\d+%", fund_data)

            # Parse fund rates
            fund_rates = []
            for index, range in enumerate(ranges):
                try:
                    fund_rates.append({
                        "days": int(range),
                        "rate": float(fund_rates_data[index].replace("%", ""))
                    })
                except IndexError:
                    fund_rates.append({
                        "days": int(range),
                        "rate": None
                    })

            # Close the document
            document.close()

            # Define Fund Model
            fund = FIC(
                name=fund_name,
                rates=fund_rates
            )

            return func.HttpResponse(
                body=fund.model_dump_json(),
                mimetype="application/json",
            )

        else:
            return func.HttpResponse(
                "Failed to download the PDF file",
                status_code=400,
            )
