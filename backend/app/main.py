from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db.database import engine, SessionLocal, Base
from .models.project import AIProject
from .schemas.project import AIProjectCreate, AIProjectUpdate, AIProjectResponse
from typing import List

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/projects", response_model=AIProjectResponse)
async def create_project(project: AIProjectCreate, db: Session = Depends(get_db)):
    db_project = AIProject(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/api/projects", response_model=List[AIProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    return db.query(AIProject).all()

@app.get("/api/projects/{project_id}", response_model=AIProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(AIProject).filter(AIProject.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.put("/api/projects/{project_id}", response_model=AIProjectResponse)
async def update_project(project_id: int, updated_project: AIProjectUpdate, db: Session = Depends(get_db)):
    db_project = db.query(AIProject).filter(AIProject.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in updated_project.dict(exclude_unset=True).items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    return db_project

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(AIProject).filter(AIProject.id == project_id).first()
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)