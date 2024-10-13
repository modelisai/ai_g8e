import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardMetric from '../components/DashboardMetric';
import DashboardChart from '../components/DashboardChart';
import ActivityFeed from '../components/ActivityFeed';
import QuickActions from '../components/QuickActions';
import { 
  calculateProjectStatusDistribution, 
  calculateRiskDistribution,
  getTopRiskyProjects,
  getProjectsNearingDeadline
} from '../utils/dashboardUtils';
import '../styles/Dashboard.css';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    highRiskProjects: 0,
    complianceRate: 0,
    activeProjects: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsResponse, metricsResponse] = await Promise.all([
        axios.get('http://localhost:8000/api/projects'),
        axios.get('http://localhost:8000/api/dashboard/metrics')
      ]);

      setProjects(projectsResponse.data);
      setMetrics(metricsResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Error fetching dashboard data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">{error}</div>;

  const statusDistribution = calculateProjectStatusDistribution(projects);
  const riskDistribution = calculateRiskDistribution(projects);
  const topRiskyProjects = getTopRiskyProjects(projects, 5);
  const projectsNearingDeadline = getProjectsNearingDeadline(projects, 30);

  return (
    <div className="dashboard">
      <h1>AI Governance Dashboard</h1>

      <section className="dashboard-metrics">
        <DashboardMetric title="Total Projects" value={metrics.totalProjects} type="projects" />
        <DashboardMetric title="High Risk Projects" value={metrics.highRiskProjects} type="risk" />
        <DashboardMetric title="Compliance Rate" value={`${metrics.complianceRate}%`} type="compliance" />
        <DashboardMetric title="Active Projects" value={metrics.activeProjects} type="active" />
      </section>

      <section className="dashboard-charts">
        <DashboardChart
          title="Project Status Distribution"
          type="pie"
          data={statusDistribution}
        />
        <DashboardChart
          title="Risk Assessment Overview"
          type="bar"
          data={riskDistribution}
        />
      </section>

      <section className="dashboard-lists">
        <div className="risky-projects">
          <h2>Top Risky Projects</h2>
          <ul>
            {topRiskyProjects.map(project => (
              <li key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  {project.name} - Risk Score: {project.risk_assessment_score}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="approaching-deadline">
          <h2>Projects Nearing Deadline</h2>
          <ul>
            {projectsNearingDeadline.map(project => (
              <li key={project.id}>
                <Link to={`/projects/${project.id}`}>
                  {project.name} - Due: {new Date(project.estimated_completion_date).toLocaleDateString()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dashboard-activity">
        <h2>Recent Activity</h2>
        <ActivityFeed />
      </section>

      <section className="dashboard-actions">
        <h2>Quick Actions</h2>
        <QuickActions />
      </section>
    </div>
  );
}

export default Dashboard;