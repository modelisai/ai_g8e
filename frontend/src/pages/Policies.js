import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Policies.css';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8000/api/policies');
        setPolicies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching policies. Please try again later.');
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) return <div className="loading">Loading policies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="policies-container">
      <h1>AI Governance Policies</h1>
      <Link to="/policies/new" className="btn btn-primary">Create New Policy</Link>
      <div className="policies-grid">
        {policies.map(policy => (
          <div key={policy.id} className="policy-card">
            <h3>{policy.title}</h3>
            <p>{policy.description.substring(0, 100)}...</p>
            <div className="policy-meta">
              <span className="policy-type">{policy.type}</span>
              <span className="policy-date">Last updated: {new Date(policy.last_updated).toLocaleDateString()}</span>
            </div>
            <Link to={`/policies/${policy.id}`} className="btn btn-secondary">View Policy</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;