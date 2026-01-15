A production-ready backend API for an expense tracker, featuring JWT authentication, protected CRUD operations, and MongoDB Atlas integration. Built with Node.js and Express, and deployed on Render.

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Render (Deployment)

---

## 🔐 Features
- User registration & login
- JWT-based authentication
- Add, fetch & delete expenses
- Secure protected routes

---

## 📡 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Expenses (Protected)
- GET `/api/expenses`
- POST `/api/expenses`
- DELETE `/api/expenses/:id`

---

## 📦 Sample Expense JSON

```json
{
  "amount": 250,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-01-13",
  "type": "expense"
}

``` 


⚙️ Environment Variables

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

PORT=5000


🚀 Deployment

Backend deployed on Render

Database hosted on MongoDB Atlas

Live API: https://expense-tracker-backend-87jh.onrender.com


💻 Author

Nikhil Prakash A T 📍 Kerala, India 📧 nikhilprakashat@gmail.com 🕸️ https://github.com/Nikhil-Prakash-AT
