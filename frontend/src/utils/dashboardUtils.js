import { formatDate } from './dateUtils';

export const calculateProjectStatusDistribution = (projects) => {
  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
};

export const calculateRiskDistribution = (projects) => {
  const riskLevels = {
    Low: 0,
    Medium: 0,
    High: 0
  };

  projects.forEach(project => {
    if (project.risk_assessment_score <= 0.3) riskLevels.Low++;
    else if (project.risk_assessment_score <= 0.7) riskLevels.Medium++;
    else riskLevels.High++;
  });

  return Object.entries(riskLevels).map(([name, value]) => ({ name, value }));
};

export const getTopRiskyProjects = (projects, limit = 5) => {
  return projects
    .sort((a, b) => b.risk_assessment_score - a.risk_assessment_score)
    .slice(0, limit)
    .map(project => ({
      id: project.id,
      name: project.name,
      risk_assessment_score: project.risk_assessment_score
    }));
};

export const getProjectsNearingDeadline = (projects, daysThreshold = 30) => {
  const today = new Date();
  const thresholdDate = new Date(today.setDate(today.getDate() + daysThreshold));

  return projects
    .filter(project => {
      const deadline = new Date(project.estimated_completion_date);
      return deadline <= thresholdDate && deadline >= today;
    })
    .sort((a, b) => new Date(a.estimated_completion_date) - new Date(b.estimated_completion_date))
    .map(project => ({
      id: project.id,
      name: project.name,
      estimated_completion_date: formatDate(project.estimated_completion_date)
    }));
};

export const calculateComplianceRate = (projects) => {
  if (projects.length === 0) return 0;

  const compliantProjects = projects.filter(project => project.compliance_status === 'Compliant');
  return (compliantProjects.length / projects.length) * 100;
};

export const calculateAverageRiskScore = (projects) => {
  if (projects.length === 0) return 0;

  const totalRiskScore = projects.reduce((sum, project) => sum + (project.risk_assessment_score || 0), 0);
  return totalRiskScore / projects.length;
};

export const getRecentlyUpdatedProjects = (projects, limit = 5) => {
  return projects
    .sort((a, b) => new Date(b.last_updated_date) - new Date(a.last_updated_date))
    .slice(0, limit)
    .map(project => ({
      id: project.id,
      name: project.name,
      last_updated_date: formatDate(project.last_updated_date)
    }));
};

export const calculateProjectsByDepartment = (projects) => {
  const departmentCounts = projects.reduce((acc, project) => {
    acc[project.department] = (acc[project.department] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(departmentCounts).map(([name, value]) => ({ name, value }));
};