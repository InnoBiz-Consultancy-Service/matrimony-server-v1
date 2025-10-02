# Matrimonial Website Backend API

A comprehensive backend API for a matrimonial website built with Node.js, Express.js, TypeScript, and MongoDB. This platform facilitates matchmaking by allowing users to create detailed biodata profiles, search for compatible matches, and manage subscriptions for premium features.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Google OAuth integration
- Email verification with OTP
- Password reset functionality
- Role-based access control (Admin/User)

### User Management
- User profile creation and verification
- Admin user management
- Email verification system

### Biodata Management
- Comprehensive biodata creation with multiple sections:
  - Personal information
  - Address details (Present/Permanent)
  - Education history
  - Family information
  - Personal preferences
  - Occupation details
  - Marriage preferences
  - Partner preferences
- Biodata approval system by admin
- Advanced filtering and search capabilities

### Subscription & Payment System
- Multiple subscription tiers (Free, Premium, VIP)
- bKash payment integration
- Profile view limits based on subscription
- Subscription management and expiration handling

### Interest & Interaction System
- Send/cancel interest to other profiles
- Track sent and received interests
- Ignore/unignore user functionality

### Profile Visit Tracking
- Track profile visits and contact info views
- Subscription-based view limits
- Visit history and analytics

### Review System
- User reviews with rating system
- Admin approval for reviews
- Review management (CRUD operations)

### Communication
- Admin email broadcast system
- Individual user email communication
- Email templates and tracking

### Special Offers
- Admin-managed special offers
- Time-based offer validity
- Offer activation/deactivation

### Location Management
- Bangladesh administrative divisions integration
- Division, District, and Upazila data
- Location-based filtering

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js (Google OAuth)
- **Payment**: bKash Payment Gateway
- **Email**: Nodemailer
- **Validation**: Zod
- **Security**: bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/matrimony-backend.git
   cd matrimony-backend
Install dependencies

bash
Copy code
npm install
Setup environment variables
Create a .env file in the root directory and add the following:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the server

bash
Copy code
npm run dev   # For development (with nodemon)
npm start     # For production
📡 API Endpoints (Sample)
Authentication
POST /api/auth/register → Register new user

POST /api/auth/login → Login user

Users
GET /api/users/:id → Get user profile

PUT /api/users/:id → Update user profile

DELETE /api/users/:id → Delete account

Matches
GET /api/matches → Get suggested matches

POST /api/matches/send-interest → Send interest request

🔐 Security Features
Passwords encrypted with bcrypt

Authentication with JWT tokens

Protected routes with middleware

CORS enabled for frontend communication

📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Nikah.com Team

yaml
Copy code

---

Do you want me to also **add sample API response examples** (like JSON outputs for register/login/profile) i