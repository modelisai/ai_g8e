import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';
import { formatDate, calculateRiskLevel } from '../utils/projectUtils';
import '../styles/ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handleCreateProject = async (projectData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/projects', projectData);
      setProjects([...projects, response.data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Error creating project. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-list-container">
      <h1>AI Projects</h1>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New Project'}
      </button>
      
      {showForm && <ProjectForm onSubmit={handleCreateProject} />}

      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-meta">
              <span className={`status status-${project.status.toLowerCase()}`}>{project.status}</span>
              <span className={`risk-level risk-${calculateRiskLevel(project.risk_assessment_score)}`}>
                Risk: {project.risk_assessment_score?.toFixed(2) || 'N/A'}
              </span>
            </div>
            <div className="project-details">
              <p>Sponsor: {project.sponsor || 'N/A'}</p>
              <p>Manager: {project.project_manager || 'N/A'}</p>
              <p>Start Date: {formatDate(project.start_date)}</p>
              <p>Est. Completion: {formatDate(project.estimated_completion_date)}</p>
            </div>
            <div className="project-actions">
              <Link to={`/projects/${project.id}`} className="btn btn-secondary">View Details</Link>
              <Link to={`/projects/${project.id}/edit`} className="btn btn-primary">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;