# auth-application

This project is a simple authentication system built with React.js for the frontend and Node.js for the backend. It features two types of users: **customers** and **admins**. Users can register and login based on their roles. The system supports **email verification** and **role-based access control** for admin login.

### 🔗 Hosted link: [auth-app](https://auth-application-cgqi.vercel.app/)


## ✨Features
- **Customer and Admin Registration**: Different roles are assigned during registration.
- **Email Verification**: Both customers and admins receive a verification email.
- **Admin Login**: Only admin users are allowed to log in from the admin login page.
- **CORS Handling**: Cross-origin access is managed between frontend and backend.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js (Express)
- **Database**: MySQL
- **Email**: Nodemailer for sending verification emails
- **Other**: Axios, Bcrypt.js, JWT for authentication, CORS for cross-origin resource sharing

## 🛠️Getting Started

### Installation

## Frontend
1. Clone the repository:
```bash
   git clone https://github.com/AniketMujbaile/auth-application.git
```

```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Run the Client:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend

1. Clone the Repository

```bash
cd server
```

2. Install Dependencies

```bash
npm install
```

3. Set Up Environment Variables

Create a .env file in the root directory and add the following variables:
 
```bash
PORT=5000
NODE_ENV=production
CLIENT_URL=http://localhost:3000
DATABASE_URL=mysql://username:password@localhost:3306/database_name
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
```

4. Run the Server

```bash
npm start
```

## API Endpoints
 
1. Authentication Endpoints:
- `POST /api/auth/register` - Registers a new user (Admin/Customer based on role).
- `POST /api/auth/login` - Logs in a user (Only admins can log in from the admin login page).
- `GET /api/auth/verify-email` - Verifies the user's email via token.

2. Frontend Pages
- Customer Registration Page: Available at `/register-customer`.
- Admin Registration Page: Available at `/register-admin`.
- Admin Login Page: Available at `/admin-login`.
