# Finance Data Processing and Access Control Backend  
Zorvyn Backend Developer Internship Assessment  
Author: Anurag Shrivas  

---

## Project Overview

This project is developed as part of the Zorvyn backend assessment. The goal was to design and implement a backend system for a finance dashboard that manages users, financial transactions, and role-based access control.

The system is designed with a focus on clean architecture, secure APIs, proper data handling, and maintainability.

---

## Live API

The backend is deployed and accessible here:

https://your-render-url.onrender.com

You can test APIs using Postman or any API client.

---

## Objective

To demonstrate backend development skills in:

- API design and structuring  
- Data modeling and relationships  
- Role-based access control  
- Error handling and validation  
- Writing clean, maintainable code  

---

## Tech Stack

Backend:
- Node.js  
- Express.js  

Database:
- MongoDB Atlas  
- Mongoose  

Authentication:
- JWT (JSON Web Tokens)  

Additional:
- Express Rate Limit (security)
- Jest & Supertest (testing setup)

Tools Used:
- VS Code  
- Postman  
- MongoDB Atlas  
- Git and GitHub  
- Render (deployment)

---

## Project Structure

```
finance-dashboard-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── transactionController.js
│   └── dashboardController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Transaction.js
│
├── routes/
│   ├── authRoutes.js
│   ├── transactionRoutes.js
│   └── dashboardRoutes.js
│
├── utils/
│   └── asyncHandler.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Installation and Setup

1. Clone the repository

```
git clone https://github.com/anuragshrivas027/finance-dashboard-backend
cd finance-dashboard-backend
```

2. Install dependencies

```
npm install
```

3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the server

```
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

## Deployment (Render)

The project is deployed using Render.

Steps followed:

1. Connected GitHub repository to Render  
2. Selected Web Service (Node environment)  
3. Added environment variables:
   - MONGO_URI  
   - JWT_SECRET  
   - PORT  
4. Set build command:
```
npm install
```
5. Set start command:
```
npm start
```

---

## Authentication and Security

- JWT-based authentication  
- Protected routes using middleware  
- Role-based authorization  
- Rate limiting to prevent abuse  

---

## User Roles and Permissions

| Role    | Access |
|--------|--------|
| Viewer | Can view dashboard data |
| Analyst | Can view transactions and analytics |
| Admin  | Full access (create, update, delete, manage) |

---

## Financial Records (Transactions)

Each transaction includes:

- amount  
- type (income or expense)  
- category  
- date  
- notes  
- createdBy  

### Features

- Create transaction  
- Get transactions  
- Update transaction  
- Soft delete transaction  
- Restore transaction (optional)  

---

## Filtering, Search and Pagination

Supported features:

- Filter by:
  - type  
  - category  
  - date range  

- Search:
  - category  
  - notes  

- Pagination:
  - page-based results  
  - configurable limit  

---

## Dashboard APIs

Provides aggregated financial insights:

- Total income  
- Total expense  
- Net balance  
- Category-wise breakdown  
- Monthly trends  
- Recent transactions  

---

## Access Control Logic

- Middleware-based protection  
- Role-based restrictions  
- Ownership validation (user can access only their data)  

---

## Validation and Error Handling

- Input validation  
- ObjectId validation  
- Centralized error handler  
- Proper HTTP status codes  
- Consistent API responses  

---

## Data Persistence

- MongoDB Atlas used as database  
- Mongoose used for schema modeling  
- Indexed queries for performance optimization  

---

## Additional Enhancements

- Soft delete (data is not permanently removed)  
- Search functionality  
- Pagination  
- Rate limiting  
- Async handler for cleaner code  
- Basic testing setup (Jest and Supertest)  

---

## API Endpoints

Auth:
```
POST /api/auth/register
POST /api/auth/login
```

Transactions:
```
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

Dashboard:
```
GET /api/dashboard
```

Protected Test Routes:
```
GET /api/protected
GET /api/admin
GET /api/analyst
GET /api/viewer
```

---

## Assumptions

- Each user can only access their own transactions  
- Roles are predefined (admin, analyst, viewer)  
- Soft delete is used instead of permanent deletion  
- Default pagination limit is applied  

---

## Technical Decisions

- Used MVC structure for better organization and scalability  
- Used middleware for authentication and role-based access  
- Chose MongoDB for flexible schema handling  
- Implemented indexing for better query performance  
- Used JWT for stateless authentication  

---

## Trade-offs

- No frontend implementation (not required for this assignment)  
- Basic validation (can be extended using validation libraries)  
- Deployment is basic (can be improved with CI/CD)  

---

## Author

Anurag Shrivas  
Email: anuragshrivas357@gmail.com  
Phone: +91 7089385383  
Location: Gwalior, Madhya Pradesh, India  

GitHub: https://github.com/anuragshrivas027  
LinkedIn: https://linkedin.com/in/anuragshrivas027  

---

## Final Note

This project demonstrates:

- Clean backend architecture  
- Secure API development  
- Proper access control  
- Real-world backend problem solving  

The focus was on correctness, clarity, and maintainability as required in the assignment.

Thank you for reviewing this submission.