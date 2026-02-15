import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import EventCard from '../components/EventCard';
import SearchFilters from '../components/SearchFilters';
import '../styles/App.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: 'All',
    date: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filterParams = {
        ...(filters.search && { search: filters.search }),
        ...(filters.location && { location: filters.location }),
        ...(filters.category !== 'All' && { category: filters.category }),
        ...(filters.date && { date: filters.date })
      };

      const data = await eventsAPI.getEvents(filterParams);
      setEvents(data.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: 'All',
      date: ''
    });
  };

  return (
    <div className="page">
      <div className="container">
        <div className="text-center mb-4">
          <h1>Discover Amazing Events</h1>
          <p>Find and register for events that interest you</p>
        </div>

        <SearchFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>No events found</h3>
            <p>Try adjusting your filters to find more events</p>
            <button className="btn btn-primary" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex-between mb-3">
              <p className="text-secondary">
                Found <strong>{events.length}</strong> event{events.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-3">
              {events.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
