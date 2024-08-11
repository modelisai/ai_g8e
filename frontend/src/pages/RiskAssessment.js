import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RiskAssessment.css';

const RiskAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8000/api/risk-assessments');
        setAssessments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching risk assessments. Please try again later.');
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  if (loading) return <div className="loading">Loading risk assessments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="risk-assessment-container">
      <h1>Risk Assessments</h1>
      <Link to="/risk-assessment/new" className="btn btn-primary">New Risk Assessment</Link>
      <div className="risk-assessment-list">
        {assessments.map(assessment => (
          <div key={assessment.id} className="risk-assessment-item">
            <h3>{assessment.project_name}</h3>
            <div className="risk-score">
              Risk Score: <span className={`score-${getRiskLevel(assessment.risk_score)}`}>{assessment.risk_score.toFixed(2)}</span>
            </div>
            <p>{assessment.summary.substring(0, 100)}...</p>
            <div className="assessment-meta">
              <span>Assessed by: {assessment.assessor}</span>
              <span>Date: {new Date(assessment.assessment_date).toLocaleDateString()}</span>
            </div>
            <Link to={`/risk-assessment/${assessment.id}`} className="btn btn-secondary">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const getRiskLevel = (score) => {
  if (score < 0.3) return 'low';
  if (score < 0.7) return 'medium';
  return 'high';
};

export default RiskAssessment;