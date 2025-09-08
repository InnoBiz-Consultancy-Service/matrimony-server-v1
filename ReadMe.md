# Matrimony Backend

This is the backend of the **Nikah.com Matrimony Platform**, a web-based matrimonial service.  
It provides secure APIs for user authentication, profile management, matchmaking, and more.  
The backend is built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

🚀 **Live URL:** [https://nikah.com](https://nikah.com)

---

## 🛠️ Technologies Used
- **Node.js** – JavaScript runtime for building scalable backend services  
- **Express.js** – Fast and lightweight web framework for APIs  
- **MongoDB** – NoSQL database for storing matrimony data  
- **Mongoose** – Elegant MongoDB object modeling for Node.js  
- **JWT (JSON Web Token)** – Authentication & Authorization  
- **Bcrypt.js** – Password hashing  
- **Dotenv** – Environment variable management  
- **Cors** – Enable secure cross-origin requests  
- **Nodemon** (dev dependency) – Auto server restart during development  

---

## 📂 Project Structure
matrimony-backend/
│── config/ # Database & environment configurations
│── controllers/ # Request handlers
│── models/ # Mongoose schemas & models
│── routes/ # Express route definitions
│── middlewares/ # Authentication & custom middleware
│── utils/ # Helper functions
│── server.js # Entry point of the application

yaml
Copy code

---

## ⚙️ Installation & Setup

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