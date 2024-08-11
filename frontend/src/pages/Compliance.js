import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Compliance.css';

const Compliance = () => {
  const [complianceReports, setComplianceReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplianceReports = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:8000/api/compliance-reports');
        setComplianceReports(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching compliance reports. Please try again later.');
        setLoading(false);
      }
    };

    fetchComplianceReports();
  }, []);

  if (loading) return <div className="loading">Loading compliance reports...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="compliance-container">
      <h1>Compliance Reports</h1>
      <Link to="/compliance/new" className="btn btn-primary">Generate New Report</Link>
      <div className="compliance-list">
        {complianceReports.map(report => (
          <div key={report.id} className="compliance-item">
            <h3>{report.title}</h3>
            <div className={`compliance-status status-${report.status.toLowerCase()}`}>
              Status: {report.status}
            </div>
            <p>{report.summary.substring(0, 100)}...</p>
            <div className="compliance-meta">
              <span>Framework: {report.framework}</span>
              <span>Date: {new Date(report.report_date).toLocaleDateString()}</span>
            </div>
            <Link to={`/compliance/${report.id}`} className="btn btn-secondary">View Report</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compliance;