import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getMyEvents(token);
      setUpcomingEvents(data.upcoming);
      setPastEvents(data.past);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    if (!window.confirm('Are you sure you want to cancel this registration?')) {
      return;
    }

    try {
      await eventsAPI.cancelRegistration(eventId, token);
      fetchMyEvents(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container dashboard">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p>Welcome back, {user?.name}! Manage your event registrations here.</p>
        </div>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {/* Stats Section */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-value">{upcomingEvents.length}</div>
            <div className="dashboard-stat-label">Upcoming Events</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-value">{pastEvents.length}</div>
            <div className="dashboard-stat-label">Past Events</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-value">
              {upcomingEvents.length + pastEvents.length}
            </div>
            <div className="dashboard-stat-label">Total Registered</div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">
              📅 Upcoming Events
              <span className="dashboard-count">{upcomingEvents.length}</span>
            </h2>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3>No upcoming events</h3>
              <p>You haven't registered for any upcoming events yet</p>
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Explore Events
              </button>
            </div>
          ) : (
            <div>
              {upcomingEvents.map(event => (
                <div key={event._id} className="dashboard-event-card">
                  <div className="dashboard-event-header">
                    <div>
                      <h3 className="dashboard-event-title">{event.name}</h3>
                      <div className="dashboard-event-meta">
                        <div className="dashboard-event-meta-item">
                          <span>📅</span>
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="dashboard-event-meta-item">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="dashboard-event-meta-item">
                          <span className="badge badge-primary">{event.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="dashboard-event-description">
                    {event.description}
                  </p>

                  <div className="dashboard-event-actions">
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => handleCancelRegistration(event._id)}
                    >
                      Cancel Registration
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">
                🕒 Past Events
                <span className="dashboard-count">{pastEvents.length}</span>
              </h2>
            </div>

            <div>
              {pastEvents.map(event => (
                <div key={event._id} className="dashboard-event-card">
                  <div className="dashboard-event-header">
                    <div>
                      <h3 className="dashboard-event-title">{event.name}</h3>
                      <div className="dashboard-event-meta">
                        <div className="dashboard-event-meta-item">
                          <span>📅</span>
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="dashboard-event-meta-item">
                          <span>📍</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="dashboard-event-meta-item">
                          <span className="badge badge-primary">{event.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="dashboard-event-description">
                    {event.description}
                  </p>

                  <div className="dashboard-event-actions">
                    <button 
                      className="btn btn-secondary btn-small"
                      onClick={() => navigate(`/events/${event._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
