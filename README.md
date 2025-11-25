# BiteSwift Backend

This is the backend API for the BiteSwift food delivery app, built with Node.js, Express, and MongoDB.  
It handles user authentication, category management, restaurants, and food items.

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Technologies
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for sending OTP emails

## Features
- User signup, login, and password reset
- Email verification with OTP
- CRUD operations for categories
- Food item management
- JWT-based authentication for protected routes


## Project Structure
biteswift-backend/
│
├─ src/
│  ├─ controllers/       # Request handlers
│  ├─ models/            # Mongoose models
│  ├─ routes/            # API routes
│  ├─ services/          # Business logic
│  ├─ utils/             # Helper functions (hashing, mail, OTP)
│  └─ middleware/        # Auth middleware
│
├─ .env                  # Environment variables (ignored by git)
├─ .gitignore            # Ignore node_modules and env files
├─ package.json
└─ README.md

## API Endpoints
POST http://localhost:5000/api/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}