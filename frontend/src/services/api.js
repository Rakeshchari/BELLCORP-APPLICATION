const API_URL = process.env.REACT_APP_API_URL || "https://bellcorp-application.onrender.com";

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data;
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }
    
    return data;
  },
};

// Events API
export const eventsAPI = {
  getEvents: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const response = await fetch(`${API_URL}/events?${queryParams.toString()}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }
    
    return data;
  },

  getEventById: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch event');
    }
    
    return data;
  },

  registerForEvent: async (eventId, token) => {
    const response = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    return data;
  },

  cancelRegistration: async (eventId, token) => {
    const response = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Cancellation failed');
    }
    
    return data;
  },

  getMyEvents: async (token) => {
    const response = await fetch(`${API_URL}/events/my/events`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch registered events');
    }
    
    return data;
  },
};
