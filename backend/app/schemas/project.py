from pydantic import BaseModel
from typing import Optional

class AIProjectBase(BaseModel):
    name: str
    description: str
    status: str
    risk_score: float

class AIProjectCreate(AIProjectBase):
    pass

class AIProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    risk_score: Optional[float] = None

class AIProjectResponse(AIProjectBase):
    id: int

    class Config:
        orm_mode = True