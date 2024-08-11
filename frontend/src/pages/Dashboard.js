import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/projects');
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching projects');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>AI Governance Dashboard</h1>
      <div className="metrics">
        <div className="metric">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>
        <div className="metric">
          <h3>High Risk Projects</h3>
          <p>{projects.filter(p => p.risk_score > 0.7).length}</p>
        </div>
      </div>
      <h2>Recent Projects</h2>
      <ul className="project-list">
        {projects.slice(0, 5).map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h3>{project.name}</h3>
              <p>Status: {project.status}</p>
              <p>Risk Score: {project.risk_score.toFixed(2)}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/projects" className="view-all">View All Projects</Link>
    </div>
  );
}

export default Dashboard;