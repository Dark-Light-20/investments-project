from typing import List
from pydantic import BaseModel


class FICRate(BaseModel):
    days: int
    rate: float


class FIC(BaseModel):
    name: str
    rates: List[FICRate]
