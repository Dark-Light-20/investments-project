import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
import httpx
from io import BytesIO
from fitz import open  # PyMuPDF
from re import search, findall
from src.models.fic import FIC
from src.models.fic_rq import FICRQ

load_dotenv()

router = APIRouter()


# Constants
ranges = ["1", "7", "30", "90", "180", "365"]
pdf_document_url = os.getenv("FIC_DATA_URL")


@router.post("/rates")
async def fetch_data(request: FICRQ):
    fund_name = request.fund_name

    async with httpx.AsyncClient() as client:
        response = await client.get(pdf_document_url)

        if response.status_code == 200:
            # Open the PDF file
            pdf_bytes = BytesIO(response.content)
            document = open(stream=pdf_bytes, filetype="pdf")

            # Extract text data from page 2
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
            return FIC(
                name=fund_name,
                rates=fund_rates
            )

        else:
            raise HTTPException(
                status_code=400,
                detail="Failed to download the PDF file"
            )
