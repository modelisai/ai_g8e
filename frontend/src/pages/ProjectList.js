import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: '',
    risk_score: 0
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects');
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching projects. Please try again later.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/projects', newProject);
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '', status: '', risk_score: 0 });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-list-container">
      <h1>AI Projects</h1>
      <form onSubmit={handleCreateProject} className="project-create-form">
        <input type="text" name="name" value={newProject.name} onChange={handleInputChange} placeholder="Project Name" required />
        <input type="text" name="description" value={newProject.description} onChange={handleInputChange} placeholder="Description" required />
        <input type="text" name="status" value={newProject.status} onChange={handleInputChange} placeholder="Status" required />
        <input type="number" name="risk_score" value={newProject.risk_score} onChange={handleInputChange} placeholder="Risk Score" required step="0.01" min="0" max="1" />
        <button type="submit">Create New Project</button>
      </form>
      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description.substring(0, 100)}...</p>
            <div className="project-meta">
              <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
              <span className="risk-score">Risk: {project.risk_score.toFixed(2)}</span>
            </div>
            <Link to={`/projects/${project.id}`} className="btn btn-secondary">View Details</Link>
            <Link to={`/projects/${project.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;