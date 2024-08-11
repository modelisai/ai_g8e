import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="project-list-container">
      <h1>AI Projects</h1>
      <Link to="/projects/new" className="btn btn-primary">Create New Project</Link>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;