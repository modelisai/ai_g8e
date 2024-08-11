from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database (replace with actual database in production)
ai_projects = []

class AIProject(BaseModel):
    id: Optional[int]
    name: str
    description: str
    status: str
    risk_score: float

@app.post("/api/projects", response_model=AIProject)
async def create_project(project: AIProject):
    project.id = len(ai_projects) + 1
    ai_projects.append(project)
    return project

@app.get("/api/projects", response_model=List[AIProject])
async def get_projects():
    return ai_projects

@app.get("/api/projects/{project_id}", response_model=AIProject)
async def get_project(project_id: int):
    project = next((p for p in ai_projects if p.id == project_id), None)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.put("/api/projects/{project_id}", response_model=AIProject)
async def update_project(project_id: int, updated_project: AIProject):
    project = next((p for p in ai_projects if p.id == project_id), None)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    project.name = updated_project.name
    project.description = updated_project.description
    project.status = updated_project.status
    project.risk_score = updated_project.risk_score
    return project

@app.delete("/api/projects/{project_id}")
async def delete_project(project_id: int):
    global ai_projects
    ai_projects = [p for p in ai_projects if p.id != project_id]
    return {"message": "Project deleted successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)