import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getEventById(id);
      setEvent(data.event);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setActionLoading(true);
      setError(null);
      await eventsAPI.registerForEvent(id, token);
      setSuccessMessage('Successfully registered for the event!');
      fetchEvent(); // Refresh event data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your registration?')) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);
      await eventsAPI.cancelRegistration(id, token);
      setSuccessMessage('Registration cancelled successfully');
      fetchEvent(); // Refresh event data
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
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
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const isRegistered = isAuthenticated && event.attendees?.includes(user?._id);
  const isSoldOut = event.availableSeats === 0;

  return (
    <div className="page">
      <div className="container event-detail">
        <div className="event-detail-header">
          <span className="event-detail-category">{event.category}</span>
          <h1 className="event-detail-title">{event.name}</h1>
          <div className="event-detail-meta">
            <div className="event-detail-meta-item">
              <span>📅</span>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="event-detail-meta-item">
              <span>📍</span>
              <span>{event.location}</span>
            </div>
            <div className="event-detail-meta-item">
              <span>👤</span>
              <span>{event.organizer}</span>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {isRegistered && (
          <div className="event-detail-status registered">
            ✅ You are registered for this event
          </div>
        )}

        {isSoldOut && !isRegistered && (
          <div className="event-detail-status sold-out">
            ❌ This event is sold out
          </div>
        )}

        <div className="event-detail-content">
          <div className="event-detail-section">
            <h2 className="event-detail-section-title">About This Event</h2>
            <p className="event-detail-description">{event.description}</p>
          </div>

          <div className="event-detail-section">
            <h2 className="event-detail-section-title">Event Details</h2>
            <div className="event-detail-info-grid">
              <div className="event-detail-info-item">
                <div className="event-detail-info-label">Available Seats</div>
                <div className="event-detail-info-value">
                  {event.availableSeats} / {event.totalSeats}
                </div>
              </div>
              <div className="event-detail-info-item">
                <div className="event-detail-info-label">Category</div>
                <div className="event-detail-info-value">{event.category}</div>
              </div>
              <div className="event-detail-info-item">
                <div className="event-detail-info-label">Organizer</div>
                <div className="event-detail-info-value">{event.organizer}</div>
              </div>
              <div className="event-detail-info-item">
                <div className="event-detail-info-label">Location</div>
                <div className="event-detail-info-value">{event.location}</div>
              </div>
            </div>
          </div>

          {event.tags && event.tags.length > 0 && (
            <div className="event-detail-section">
              <h2 className="event-detail-section-title">Tags</h2>
              <div className="event-detail-tags">
                {event.tags.map((tag, index) => (
                  <span key={index} className="event-detail-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="event-detail-actions">
            {isAuthenticated ? (
              <>
                {isRegistered ? (
                  <button 
                    className="btn btn-danger"
                    onClick={handleCancel}
                    disabled={actionLoading}
                  >
                    {actionLoading ? 'Processing...' : 'Cancel Registration'}
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary"
                    onClick={handleRegister}
                    disabled={actionLoading || isSoldOut}
                  >
                    {actionLoading ? 'Processing...' : isSoldOut ? 'Sold Out' : 'Register for Event'}
                  </button>
                )}
              </>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Login to Register
              </button>
            )}
            
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
