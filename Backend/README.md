# 📦 Portfolio API

A clean, beginner-friendly RESTful API built with **Node.js** and **Express.js**.  
Uses an in-memory array as a data store — no database required.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
node server.js

# 3. For auto-restart on file changes (dev mode)
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📁 Folder Structure

```
portfolio-api/
├── server.js                  ← Entry point, Express setup
├── package.json
├── README.md
│
├── data/
│   └── users.js               ← In-memory data store (our "database")
│
├── routes/
│   └── userRoutes.js          ← Maps HTTP routes → controller functions
│
├── controllers/
│   └── userController.js      ← Business logic for each endpoint
│
└── middleware/
    ├── logger.js              ← Logs every request with color + timing
    └── errorHandler.js        ← Global error handler
```

---

## 📋 API Endpoints

| Method   | Endpoint       | Description              |
|----------|----------------|--------------------------|
| GET      | `/`            | API info & health check  |
| GET      | `/users`       | Get all users            |
| GET      | `/users/:id`   | Get a user by ID         |
| POST     | `/users`       | Create a new user        |
| PUT      | `/users/:id`   | Update a user            |
| DELETE   | `/users/:id`   | Delete a user            |

---

## 🔌 Usage Examples

### GET all users
```
GET http://localhost:3000/users
```
**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "name": "Prashant Sharma", "email": "prashant@example.com", ... },
    ...
  ]
}
```

---

### GET all users filtered by role
```
GET http://localhost:3000/users?role=Frontend
```

---

### GET single user
```
GET http://localhost:3000/users/1
```
**Response:**
```json
{
  "success": true,
  "data": { "id": 1, "name": "Prashant Sharma", ... }
}
```

---

### POST — create a new user
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Sneha Patil",
  "email": "sneha@example.com",
  "role": "UI Designer",
  "skills": ["Figma", "CSS", "HTML"]
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": { "id": 4, "name": "Sneha Patil", ... }
}
```

---

### PUT — update a user
```
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "role": "Senior Full Stack Developer"
}
```

---

### DELETE a user
```
DELETE http://localhost:3000/users/2
```
**Response (200):**
```json
{
  "success": true,
  "message": "User \"Anjali Mehta\" deleted successfully.",
  "data": { ... }
}
```

---

## ⚠️ Error Responses

| Status | Scenario                        |
|--------|---------------------------------|
| 400    | Missing/invalid fields          |
| 404    | User not found                  |
| 409    | Duplicate email                 |
| 500    | Unexpected server error         |

**Example 404:**
```json
{
  "success": false,
  "message": "User with ID 99 not found."
}
```

**Example 400 (validation):**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    "name is required and must be a non-empty string.",
    "email must be a valid email address."
  ]
}
```

---

## 🧪 Testing with curl

```bash
# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"Student"}'

# Update user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"role":"Junior Developer"}'

# Delete user
curl -X DELETE http://localhost:3000/users/3
```
