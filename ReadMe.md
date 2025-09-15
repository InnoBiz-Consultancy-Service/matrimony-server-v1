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
   git clone <repository-url>
   cd matrimonial-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/matrimonial
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   
   # Email Configuration
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # bKash Payment
   BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta
   BKASH_APP_KEY=your_bkash_app_key
   BKASH_APP_SECRET=your_bkash_app_secret
   BKASH_USERNAME=your_bkash_username
   BKASH_PASSWORD=your_bkash_password
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🌐 Live API

**Base URL**: `https://matrimony-server-v1.vercel.app`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/logout` | User logout |
| POST | `/api/v1/auth/reset-password` | Reset password |
| GET | `/api/v1/auth/google` | Google OAuth login |
| GET | `/api/v1/auth/google/callback` | Google OAuth callback |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/register` | User registration |
| GET | `/api/v1/users/all` | Get all users (Admin) |
| PATCH | `/api/v1/users/:id/verify` | Verify user (Admin) |

### OTP Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/otp/send` | Send OTP to email |
| POST | `/api/v1/otp/verify` | Verify OTP |

### Biodata Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/biodata` | Create/Update biodata |
| PATCH | `/api/v1/biodata` | Update own biodata |
| GET | `/api/v1/biodata/all` | Get all approved biodata |
| GET | `/api/v1/biodata/my-biodata` | Get own biodata |
| GET | `/api/v1/biodata/pending` | Get pending biodata (Admin) |
| GET | `/api/v1/biodata/:id` | Get biodata by ID |
| PATCH | `/api/v1/biodata/approval/:id` | Approve/Reject biodata (Admin) |

### Interest Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/interest/send` | Send interest |
| PATCH | `/api/v1/interest/cancel/:receiverId` | Cancel interest |
| GET | `/api/v1/interest/sent` | Get sent interests |
| GET | `/api/v1/interest/received` | Get received interests |

### Ignore List
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/ignore` | Ignore a user |
| DELETE | `/api/v1/ignore/unignore` | Unignore a user |
| GET | `/api/v1/ignore` | Get ignored users |

### Profile Visit Tracking
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/profile-visit/:biodataId` | View contact info |
| GET | `/api/v1/profile-visit/profile-view-status` | Get profile view status |

### Payment & Subscription
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/payment/create` | Create payment |
| PUT | `/api/v1/payment/approve/:id` | Approve payment (Admin) |
| GET | `/api/v1/payment/all` | Get all payments (Admin) |
| POST | `/api/v1/subscription/create` | Create subscription |
| PATCH | `/api/v1/subscription/activate/:id` | Activate subscription (Admin) |
| GET | `/api/v1/subscription/all` | Get all subscriptions (Admin) |
| GET | `/api/v1/subscription/:id` | Get subscription by ID (Admin) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/reviews` | Create review |
| GET | `/api/v1/reviews` | Get all approved reviews |
| GET | `/api/v1/reviews/my-review` | Get user's reviews |
| GET | `/api/v1/reviews/pending` | Get pending reviews (Admin) |
| PUT | `/api/v1/reviews/approve/:reviewId` | Approve review (Admin) |
| PUT | `/api/v1/reviews/update/:reviewId` | Update review |
| DELETE | `/api/v1/reviews/delete/:reviewId` | Delete review |

### Email Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/mail/send-single` | Send email to single user (Admin) |
| POST | `/api/v1/mail/send-all` | Send email to all users (Admin) |
| GET | `/api/v1/mail` | Get all sent emails (Admin) |

### Special Offers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/special-offers` | Create offer (Admin) |
| GET | `/api/v1/special-offers` | Get all active offers |
| DELETE | `/api/v1/special-offers/:id` | Delete offer (Admin) |

### Location Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/public/divisions` | Get all divisions |
| GET | `/api/v1/public/divisions/:id` | Get division by ID |
| GET | `/api/v1/public/districts` | Get all districts |
| GET | `/api/v1/public/districts/:id` | Get district by ID |
| GET | `/api/v1/public/upazilas` | Get all upazilas |
| GET | `/api/v1/public/upazilas/:id` | Get upazila by ID |

## 🧪 Example API Calls

### Register a new user
```bash
curl -X POST https://matrimony-server-v1.vercel.app/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "phone": "01712345678",
    "gender": "male",
    "agreeToPrivacy": true,
    "agreeToTerms": true
  }'
```

### Login user
```bash
curl -X POST https://matrimony-server-v1.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get all biodata (with filters)
```bash
curl -X GET "https://matrimony-server-v1.vercel.app/api/v1/biodata/all?gender=male&minAge=25&maxAge=35&division=Dhaka" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Database Schema

### Key Collections

#### Users
- User authentication and profile information
- Subscription status and type
- Role-based permissions

#### Biodata
- Comprehensive user profiles with personal, family, education, and preference details
- Approval status management
- Advanced filtering capabilities

#### Subscriptions
- Subscription type (Free, Premium, VIP)
- Duration and limits management
- Status tracking

#### Interests
- User interest tracking
- Status management (sent/cancelled)

#### Reviews
- User feedback system
- Rating and comment management

#### Payments
- Payment processing records
- Integration with subscription system

## 🔐 Security Features

- JWT token-based authentication
- Password encryption using bcrypt
- Input validation with Zod
- Role-based access control
- Rate limiting and security headers
- Environment variable configuration

## 🚦 Subscription Tiers

| Feature | Free | Premium | VIP |
|---------|------|---------|-----|
| Profile Creation | ✅ | ✅ | ✅ |
| Basic Search | ✅ | ✅ | ✅ |
| Send Interest | ❌ | ✅ | ✅ |
| View Contact Info | Limited | 100 profiles | 300 profiles |
| Advanced Filters | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |

## 📞 Support

For support and queries, please contact the development team or create an issue in the repository.




## 🏗️ Project Structure

```
src/
├── app/
│   ├── controllers/          # OTP controllers
│   ├── module/              # Feature modules
│   │   ├── auth/           # Authentication
│   │   ├── biodata/        # Biodata management
│   │   ├── user/           # User management
│   │   ├── payment/        # Payment processing
│   │   ├── subscription/   # Subscription management
│   │   ├── interest/       # Interest management
│   │   ├── review/         # Review system
│   │   └── ...
│   └── services/           # External services
├── config/                 # Configuration files
├── middlewares/           # Custom middlewares
├── utils/                # Utility functions
└── types/               # TypeScript type definitions
```

---

**Happy Coding! 💝**