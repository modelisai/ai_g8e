import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faExclamationTriangle, 
  faFileAlt, 
  faUserShield 
} from '@fortawesome/free-solid-svg-icons';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/activities');
      setActivities(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'project':
        return faProjectDiagram;
      case 'risk':
        return faExclamationTriangle;
      case 'policy':
        return faFileAlt;
      case 'user':
        return faUserShield;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <FontAwesomeIcon icon={getActivityIcon(activity.type)} className="activity-icon" />
          <div className="activity-content">
            <p>
              <strong>{activity.user}</strong> {activity.action}{' '}
              {activity.type === 'project' && (
                <Link to={`/projects/${activity.projectId}`}>{activity.projectName}</Link>
              )}
              {activity.type !== 'project' && activity.target}
            </p>
            <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;