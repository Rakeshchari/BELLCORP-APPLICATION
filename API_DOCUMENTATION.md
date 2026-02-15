# API Documentation

Complete API reference for the Event Management System.

**Base URL**: `http://localhost:5000/api`

## Table of Contents

1. [Authentication](#authentication)
2. [Events](#events)
3. [Error Handling](#error-handling)
4. [Status Codes](#status-codes)

---

## Authentication

All authentication endpoints are under `/api/auth`

### Register User

Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation**:
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response** (400):
```json
{
  "message": "User already exists with this email"
}
```

---

### Login User

Authenticate and get access token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response** (401):
```json
{
  "message": "Invalid email or password"
}
```

---

### Get Current User

Get authenticated user details.

**Endpoint**: `GET /auth/me`

**Authentication**: Required (Bearer Token)

**Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "registeredEvents": [
      {
        "_id": "507f191e810c19729de860ea",
        "name": "React Conference 2026",
        "date": "2026-04-15T09:00:00.000Z",
        "location": "San Francisco, CA",
        ...
      }
    ],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-02-15T10:00:00.000Z"
  }
}
```

**Error Response** (401):
```json
{
  "message": "No token, authorization denied"
}
```

---

## Events

All event endpoints are under `/api/events`

### Get All Events

Retrieve events with optional filtering.

**Endpoint**: `GET /events`

**Query Parameters**:
- `search` (string, optional): Search in name, organizer, description
- `location` (string, optional): Filter by location (partial match)
- `category` (string, optional): Filter by category (exact match)
- `date` (string, optional): Filter by date (YYYY-MM-DD format)
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Results per page (default: 12)

**Example Requests**:
```bash
# Get all events
GET /events

# Search for "React"
GET /events?search=React

# Filter by category
GET /events?category=Technology

# Filter by location
GET /events?location=San Francisco

# Filter by date
GET /events?date=2026-04-15

# Combined filters
GET /events?category=Technology&location=San Francisco&page=1&limit=10
```

**Success Response** (200):
```json
{
  "events": [
    {
      "_id": "507f191e810c19729de860ea",
      "name": "React Conference 2026",
      "organizer": "Tech Events Inc",
      "location": "San Francisco, CA",
      "date": "2026-04-15T09:00:00.000Z",
      "description": "Join us for the biggest React conference...",
      "totalSeats": 500,
      "availableSeats": 450,
      "category": "Technology",
      "tags": ["React", "JavaScript", "Frontend"],
      "attendees": [],
      "createdAt": "2026-02-15T10:00:00.000Z",
      "updatedAt": "2026-02-15T10:00:00.000Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "total": 12
}
```

---

### Get Event by ID

Get detailed information about a specific event.

**Endpoint**: `GET /events/:id`

**URL Parameters**:
- `id` (string, required): Event ID

**Success Response** (200):
```json
{
  "event": {
    "_id": "507f191e810c19729de860ea",
    "name": "React Conference 2026",
    "organizer": "Tech Events Inc",
    "location": "San Francisco, CA",
    "date": "2026-04-15T09:00:00.000Z",
    "description": "Join us for the biggest React conference of the year!",
    "totalSeats": 500,
    "availableSeats": 450,
    "category": "Technology",
    "tags": ["React", "JavaScript", "Frontend"],
    "attendees": ["507f1f77bcf86cd799439011"],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-02-15T10:00:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "message": "Event not found"
}
```

---

### Create Event

Create a new event (for testing/admin purposes).

**Endpoint**: `POST /events`

**Authentication**: Required (Bearer Token)

**Request Body**:
```json
{
  "name": "New Event",
  "organizer": "Event Organizer",
  "location": "New York, NY",
  "date": "2026-06-01T10:00:00.000Z",
  "description": "This is a new event description",
  "totalSeats": 100,
  "category": "Technology",
  "tags": ["Tech", "Innovation"]
}
```

**Success Response** (201):
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "507f191e810c19729de860ea",
    "name": "New Event",
    "organizer": "Event Organizer",
    "location": "New York, NY",
    "date": "2026-06-01T10:00:00.000Z",
    "description": "This is a new event description",
    "totalSeats": 100,
    "availableSeats": 100,
    "category": "Technology",
    "tags": ["Tech", "Innovation"],
    "attendees": [],
    "createdAt": "2026-02-15T10:00:00.000Z",
    "updatedAt": "2026-02-15T10:00:00.000Z"
  }
}
```

---

### Register for Event

Register current user for an event.

**Endpoint**: `POST /events/:id/register`

**Authentication**: Required (Bearer Token)

**URL Parameters**:
- `id` (string, required): Event ID

**Success Response** (200):
```json
{
  "message": "Successfully registered for event",
  "event": {
    "_id": "507f191e810c19729de860ea",
    "name": "React Conference 2026",
    "availableSeats": 449,
    "totalSeats": 500,
    ...
  }
}
```

**Error Responses**:

Already Registered (400):
```json
{
  "message": "Already registered for this event"
}
```

No Seats Available (400):
```json
{
  "message": "No seats available"
}
```

Event Not Found (404):
```json
{
  "message": "Event not found"
}
```

---

### Cancel Registration

Cancel user's registration for an event.

**Endpoint**: `DELETE /events/:id/register`

**Authentication**: Required (Bearer Token)

**URL Parameters**:
- `id` (string, required): Event ID

**Success Response** (200):
```json
{
  "message": "Registration cancelled successfully",
  "event": {
    "_id": "507f191e810c19729de860ea",
    "name": "React Conference 2026",
    "availableSeats": 450,
    "totalSeats": 500,
    ...
  }
}
```

**Error Response** (400):
```json
{
  "message": "Not registered for this event"
}
```

---

### Get My Events

Get all events the authenticated user is registered for.

**Endpoint**: `GET /events/my/events`

**Authentication**: Required (Bearer Token)

**Success Response** (200):
```json
{
  "upcoming": [
    {
      "_id": "507f191e810c19729de860ea",
      "name": "React Conference 2026",
      "date": "2026-04-15T09:00:00.000Z",
      "location": "San Francisco, CA",
      ...
    }
  ],
  "past": [
    {
      "_id": "507f191e810c19729de860eb",
      "name": "Past Event",
      "date": "2026-01-10T09:00:00.000Z",
      "location": "Boston, MA",
      ...
    }
  ],
  "all": [
    // All registered events (upcoming + past)
  ]
}
```

---

## Error Handling

All endpoints follow consistent error response format:

```json
{
  "message": "Error description",
  "error": "Detailed error (only in development mode)"
}
```

### Common Errors

**Authentication Errors**:
```json
// No token provided
{
  "message": "No token, authorization denied"
}

// Invalid token
{
  "message": "Invalid token"
}

// Expired token
{
  "message": "Token expired"
}
```

**Validation Errors**:
```json
{
  "message": "Error creating event",
  "error": "Event validation failed: name: Path `name` is required."
}
```

---

## Status Codes

| Code | Description |
|------|-------------|
| 200  | OK - Request successful |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input or business logic error |
| 401  | Unauthorized - Authentication required or failed |
| 404  | Not Found - Resource not found |
| 500  | Internal Server Error - Server error |

---

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider adding:
- Request rate limits per IP/user
- Token expiration (currently 7 days)

---

## Authentication Flow

1. **Register/Login**: Get JWT token
2. **Store Token**: Save in localStorage (frontend)
3. **Use Token**: Include in Authorization header for protected routes
4. **Token Format**: `Bearer <token>`

Example:
```bash
curl -X POST http://localhost:5000/api/events/123/register \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Categories

Available event categories:
- Technology
- Business
- Art
- Music
- Sports
- Education
- Other

---

## Best Practices

1. **Always use HTTPS in production**
2. **Store JWT securely** (not in localStorage for production apps)
3. **Validate inputs on both client and server**
4. **Handle errors gracefully**
5. **Use pagination for large datasets**
6. **Cache responses when appropriate**

---

## Testing with curl

### Complete Flow Example

```bash
# 1. Register
TOKEN=$(curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}' \
  | jq -r '.token')

# 2. Get events
curl http://localhost:5000/api/events

# 3. Register for event
curl -X POST http://localhost:5000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer $TOKEN"

# 4. Get my events
curl http://localhost:5000/api/events/my/events \
  -H "Authorization: Bearer $TOKEN"

# 5. Cancel registration
curl -X DELETE http://localhost:5000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer $TOKEN"
```

---

For more information, check the main README.md file.
