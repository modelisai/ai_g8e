from sqlalchemy import Column, Integer, String, Float
from ..db.database import Base

class AIProject(Base):
    __tablename__ = "ai_projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    status = Column(String)
    risk_score = Column(Float)