# Matrimonial Website Backend API

A comprehensive backend API for a matrimonial website built with Node.js, Express.js, TypeScript, and MongoDB. This platform facilitates matchmaking by allowing users to create detailed biodata profiles, search for compatible matches, and manage subscriptions for premium features.

## Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Google OAuth integration
- Email verification with OTP
- Password reset functionality
- Role-based access control (Admin/User)

### User Management
- User profile creation and verification
- Admin user management
- Profile completion tracking

### Biodata Management
- Comprehensive biodata creation with multiple sections including personal information, address details, education history, family information, occupation details, and marriage preferences
- Biodata approval system by admin
- Advanced filtering and search capabilities
- Profile status tracking (pending/approved)

### Subscription & Payment System
- Multiple subscription tiers (Free, Premium, VIP)
- bKash payment integration
- Profile view limits based on subscription
- Subscription management and expiration handling

### Interest & Interaction System
- Send and cancel interest to other profiles
- Track sent and received interests
- Ignore and unignore user functionality
- Shortlist profiles for later review

### Profile Visit Tracking
- Track profile visits and contact info views
- Subscription-based view limits
- Visit history and analytics

### Review System
- User reviews with rating system
- Admin approval for reviews
- Complete review management (CRUD operations)

### Communication
- Admin email broadcast system
- Individual user email communication
- Newsletter subscription management
- Contact form for user inquiries

### Special Offers
- Admin-managed special offers
- Time-based offer validity
- Dynamic pricing and promotions

### Location Management
- Bangladesh administrative divisions integration
- Division, District, and Upazila data
- Location-based filtering

## Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Passport.js (Google OAuth)
- **Payment**: bKash Payment Gateway
- **Email**: Nodemailer
- **Validation**: Zod
- **Security**: bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn package manager

## Installation

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

## Live API

**Base URL**: `https://matrimony-server-v1.vercel.app`

**Local URL**: `http://localhost:5000`

## API Documentation

### Authentication

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Abcd@1234"
}
```

#### Logout
```http
POST /api/v1/auth/logout
```

#### Google OAuth
```http
GET /api/v1/auth/google
```

### User Management

#### Register User
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "Redwan Reyad",
  "email": "user@example.com",
  "password": "Abcd@1234",
  "phone": "01777777789",
  "picture": "https://example.com/pic.jpg",
  "address": "Dhaka, Bangladesh",
  "gender": "male",
  "agreeToPrivacy": true,
  "agreeToTerms": true
}
```

#### Get Own Profile
```http
GET /api/v1/biodata/:userId
Authorization: Bearer <token>
```

#### Update Profile
```http
PATCH /api/v1/user/profile/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "gender": "female"
}
```

### Biodata Management

#### Create/Update Biodata
```http
POST /api/v1/biodata
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Sanjid Jeem",
  "gender": "male",
  "age": 24,
  "address": {
    "present": {
      "address": "Banani, Dhaka",
      "upazila": "Banani",
      "district": "Dhaka",
      "division": "Dhaka"
    },
    "permanent": {
      "address": "Gazipur Sadar",
      "upazila": "Gazipur",
      "district": "Gazipur",
      "division": "Dhaka"
    },
    "grewUpAt": "Dhaka",
    "country": "Bangladesh"
  },
  "education": {
    "method": "General",
    "history": [
      {
        "level": "SSC",
        "year": 2019,
        "group": "Science",
        "result": "GPA 5.00",
        "subject": "Science",
        "institution": "Sataish School & College"
      }
    ],
    "other": ["Web Development Course"]
  },
  "family": {
    "fatherAlive": true,
    "motherAlive": true,
    "fatherProfession": "Businessman",
    "motherProfession": "Housewife",
    "brothers": 1,
    "sisters": 2,
    "financialStatus": "Middle Class"
  },
  "personal": {
    "dress": "Hijab + Abaya",
    "prayerHabit": "Regular",
    "maintainMahram": true,
    "quranReading": true,
    "fiqh": "Hanafi"
  },
  "occupation": {
    "current": "Student & Web Developer",
    "description": "Frontend developer",
    "income": {
      "amount": 15000,
      "currency": "BDT"
    }
  },
  "preference": {
    "ageRange": "25-30",
    "complexion": "Fair",
    "height": "5'6\"+",
    "education": "Graduate",
    "location": "Dhaka or nearby"
  },
  "pledge": {
    "parentsAware": true,
    "informationAccurate": true,
    "nikahResponsibility": true
  }
}
```

#### Get All Biodata
```http
GET /api/v1/biodata/all
Authorization: Bearer <token>
```

#### Get Own Biodata
```http
GET /api/v1/biodata/my-biodata
Authorization: Bearer <token>
```

#### Get Biodata by ID
```http
GET /api/v1/biodata/:biodataId
Authorization: Bearer <token>
```

#### Get Pending Biodatas (Admin)
```http
GET /api/v1/biodata/pending
Authorization: Bearer <token>
```

#### Approve Biodata (Admin)
```http
PATCH /api/v1/biodata/approval/:biodataId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved"
}
```

#### Delete Own Biodata
```http
DELETE /api/v1/biodata
Authorization: Bearer <token>
```

### Subscription Management

#### Get All Subscriptions
```http
GET /api/v1/subscription/all
Authorization: Bearer <token>
```

#### Activate Subscription (Admin)
```http
PATCH /api/v1/subscription/activate/:subscriptionId
Authorization: Bearer <token>
```

#### Expire Subscription (Admin)
```http
PATCH /api/v1/subscription/expire/:subscriptionId
Authorization: Bearer <token>
```

### Interest Management

#### Send Interest
```http
POST /api/v1/interest/send?receiverId=:receiverId
Authorization: Bearer <token>
```

#### Cancel Interest
```http
PATCH /api/v1/interest/cancel/:receiverId
Authorization: Bearer <token>
```

### Payment Management

#### Create Payment
```http
POST /api/v1/payment/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "subscriptionType": "premium",
  "durationInMonths": 2,
  "amount": 500,
  "name": "Sanjid Alom",
  "paidAmount": 500
}
```

#### Approve Payment (Admin)
```http
PATCH /api/v1/payment/approve/:paymentId
Authorization: Bearer <token>
```

### Profile Visit

#### Record Contact Visit
```http
POST /api/v1/contact-visit/:userId
Authorization: Bearer <token>
```

### Ignore Users

#### Ignore a User
```http
POST /api/v1/ignore?ignoredUserId=:userId
Authorization: Bearer <token>
```

#### Unignore a User
```http
DELETE /api/v1/ignore/unignore?ignoredUserId=:userId
Authorization: Bearer <token>
```

### Reviews

#### Post Review
```http
POST /api/v1/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4.5,
  "comment": "User is very cooperative and friendly."
}
```

#### Get All Reviews
```http
GET /api/v1/review
```

#### Get Pending Reviews (Admin)
```http
GET /api/v1/review/pending
Authorization: Bearer <token>
```

#### Get Own Review
```http
GET /api/v1/review/my-review
Authorization: Bearer <token>
```

#### Approve Review (Admin)
```http
PUT /api/v1/review/approve/:reviewId
Authorization: Bearer <token>
```

#### Update Review
```http
PUT /api/v1/review/update/:reviewId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated comment"
}
```

#### Delete Review
```http
DELETE /api/v1/review/delete/:reviewId
Authorization: Bearer <token>
```

### Email Services

#### Send Email to Single User (Admin)
```http
POST /api/v1/mail/send-single?email=user@example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject": "Welcome to Nikah App",
  "body": "Hello! Your account has been verified successfully."
}
```

#### Send Email to All Users (Admin)
```http
POST /api/v1/mail/send-all
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject": "Newsletter",
  "body": "Hello all verified users! This is an important update."
}
```

### Special Offers

#### Create Special Offer (Admin)
```http
POST /api/v1/special-offers
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "November Premium Discount",
  "description": "Get 30% off on all premium packages!",
  "validTill": "2025-09-30T23:59:59.000Z"
}
```

#### Delete Special Offer (Admin)
```http
DELETE /api/v1/special-offers/:offerId
Authorization: Bearer <token>
```

### Newsletter

#### Subscribe to Newsletter
```http
POST /api/v1/subscriber
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Get All Subscribers (Admin)
```http
GET /api/v1/subscriber
Authorization: Bearer <token>
```

### Contact Us

#### Submit Contact Form
```http
POST /api/v1/contactUs
Content-Type: application/json

{
  "email": "user@example.com",
  "subject": "Test Contact",
  "body": "Hello Admin, this is a test message!"
}
```

### Shortlist

#### Add to Shortlist
```http
POST /api/v1/shortList/:userId
Authorization: Bearer <token>
```

## Data Models

### User Schema
```typescript
{
  name: string
  email: string
  password: string (hashed)
  phone: string
  picture?: string
  address: string
  gender: "male" | "female"
  role: "user" | "admin"
  hasBiodata: boolean
  subscriptionType: "free" | "premium" | "vip"
  agreeToPrivacy: boolean
  agreeToTerms: boolean
}
```

### Biodata Schema
```typescript
{
  userId: ObjectId
  name: string
  gender: "male" | "female"
  age: number
  address: {
    present: AddressDetail
    permanent: AddressDetail
    grewUpAt: string
    country: string
  }
  education: {
    method: string
    history: EducationHistory[]
    other?: string[]
  }
  family: FamilyInfo
  personal: PersonalInfo
  occupation: OccupationInfo
  marriage: MarriageInfo
  preference: PreferenceInfo
  pledge: PledgeInfo
  status: "pending" | "approved" | "rejected"
}
```

## Subscription Tiers

| Feature | Free | Premium | VIP |
|---------|------|---------|-----|
| Profile Creation | ✓ | ✓ | ✓ |
| Basic Search | ✓ | ✓ | ✓ |
| Send Interest | ✗ | ✓ | ✓ |
| View Contact Info | Limited | 100 profiles | 300 profiles |
| Advanced Filters | ✗ | ✓ | ✓ |
| Priority Support | ✗ | ✗ | ✓ |

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error message description"
}
```

## Security Features

- JWT token-based authentication
- Password encryption using bcrypt
- Input validation with Zod
- Role-based access control
- Rate limiting and security headers
- Environment variable configuration

## Project Structure

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

## Getting Started

1. Set up your environment variables
2. Configure the database connection
3. Register a new user account
4. Login to receive JWT token
5. Use the token for authenticated requests

## Notes

- All dates should be in ISO 8601 format
- File uploads should be handled via external services (URLs only)
- JWT tokens expire after 7 days
- Admin endpoints require admin role authentication
- All passwords must meet minimum security requirements

## Support

For support and queries, please use the Contact Us endpoint or reach out to the development team.

## License

This project is licensed under the MIT License.

---

**Built with ❤️ for connecting hearts**