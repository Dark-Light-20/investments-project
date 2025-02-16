from pydantic import BaseModel


class FICRQ(BaseModel):
    fund_name: str
