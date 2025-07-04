# subscription-tracker-api
# Subscription Tracker API

A Node.js RESTful API for managing user subscriptions, built with Express and MongoDB.

## Features

- **User Authentication:** Sign up, sign in, and JWT-based authentication.
- **Subscription Management:** Create, read, update, and delete subscriptions.
- **User Management:** Retrieve and manage user data.
- **Authorization:** Protects sensitive routes using middleware.
- **Validation:** Ensures data integrity with Mongoose schema validation.
- **Error Handling:** Centralized error middleware for consistent API responses.
- **Extensible:** Easily add new features like subscription renewal reminders.

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account or local MongoDB instance

### Installation
2. Install dependencies:
npm install


3. Set up environment variables:

# Create a .env file (or .env.development.local) in the root directory and add:

PORT=5500
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

4. start the sever:
# npm run start

# The API will be running at http://localhost:5500.

# API Endpoints 

# Auth
**Method	Endpoint	    Description**
POST	   /auth/sign-up	Register new user
POST	   /auth/sign-in	Login user
POST	   /auth/sign-out	Logout 


# Users
**Method Endpoint	  Description**
 GET	 /users/	   Get all users
 GET	 /users/:id	   Get user by ID
 POST	 /users/	   Create user
 PUT	 /users/:id	   Update user
 DELETE	 /users/:id	   Delete user

# Subscriptions
**Method    Endpoint	               Description**
GET        /subscriptions/	           Get all subscriptions
GET        /subscriptions/user/:id     Get all subscriptions for a user
POST       /subscriptions/	           Create subscription
PUT        /subscriptions/:id	       Update subscription
DELETE     /subscriptions/:id	       Delete subscription

# Authentication
- Use the JWT token returned from /auth/sign-in 

- Authorization header as Bearer <token> for protected routes.


# License
- MIT

Happy tracking!

