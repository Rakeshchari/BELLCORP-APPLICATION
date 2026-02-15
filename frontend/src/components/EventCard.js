import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

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

  const isLowSeats = event.availableSeats < 10;
  const isSoldOut = event.availableSeats === 0;

  return (
    <div className="event-card" onClick={() => navigate(`/events/${event._id}`)}>
      <div className="event-card-header">
        <span className="event-card-category">{event.category}</span>
        <h3 className="event-card-title">{event.name}</h3>
      </div>
      
      <div className="event-card-body">
        <div className="event-card-info">
          <div className="event-card-info-item">
            <span className="event-card-info-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-card-info-item">
            <span className="event-card-info-icon">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="event-card-info-item">
            <span className="event-card-info-icon">👤</span>
            <span>{event.organizer}</span>
          </div>
        </div>

        <p className="event-card-description">{event.description}</p>

        <div className="event-card-footer">
          <div className={`event-card-seats ${isLowSeats ? 'low' : ''}`}>
            {isSoldOut ? (
              <span>Sold Out</span>
            ) : (
              <>
                <span className="event-card-seats-count">{event.availableSeats}</span>
                <span> / {event.totalSeats} seats left</span>
              </>
            )}
          </div>
          <button 
            className="btn btn-primary btn-small event-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${event._id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
