// Format date to a more readable string
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate risk level based on risk assessment score
  export const calculateRiskLevel = (score) => {
    if (score === null || score === undefined) return 'unknown';
    if (score < 0.3) return 'low';
    if (score < 0.7) return 'medium';
    return 'high';
  };
  
  // Format budget numbers
  export const formatBudget = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };
  
  // Calculate project duration in days
  export const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationMs = end - start;
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    return `${durationDays} days`;
  };
  
  // Format array of strings for display
  export const formatArrayForDisplay = (arr) => {
    if (!arr || arr.length === 0) return 'N/A';
    return arr.join(', ');
  };
  
  // Calculate completion percentage
  export const calculateCompletionPercentage = (project) => {
    if (project.status === 'Completed') return 100;
    if (!project.start_date || !project.estimated_completion_date) return 0;
  
    const start = new Date(project.start_date);
    const end = new Date(project.estimated_completion_date);
    const today = new Date();
  
    if (today >= end) return 100;
    if (today <= start) return 0;
  
    const totalDuration = end - start;
    const elapsedDuration = today - start;
  
    return Math.round((elapsedDuration / totalDuration) * 100);
  };
  
  // Get status color
  export const getStatusColor = (status) => {
    const statusColors = {
      'Proposed': '#ffd700',     // Gold
      'In Development': '#1e90ff', // Dodger Blue
      'Active': '#32cd32',       // Lime Green
      'On Hold': '#ff8c00',      // Dark Orange
      'Completed': '#4caf50',    // Green
      'Archived': '#a9a9a9'      // Dark Gray
    };
  
    return statusColors[status] || '#000000'; // Default to black if status not found
  };
  
  // Truncate long text
  export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  
  // Sort projects by a given field
  export const sortProjects = (projects, field, direction = 'asc') => {
    return [...projects].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  // Filter projects based on search term
  export const filterProjects = (projects, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return projects.filter(project => 
      project.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.status.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };