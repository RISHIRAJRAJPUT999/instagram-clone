# 📸 Instagram Mini Clone

A full-stack **Instagram-style mini social media application** that replicates core features of Instagram such as authentication, following users, creating posts, liking, commenting, and viewing a personalized feed.

This project is designed to demonstrate **backend API development, frontend integration, and database relationships** using modern web technologies.

---

## 🚀 Project Overview

The **Instagram Mini Clone** allows users to:
- Create an account and log in securely
- Follow and unfollow other users
- Create image posts with captions
- Like and unlike posts
- Comment on posts
- View a feed consisting of posts from followed users only

This project is suitable for **learning full-stack development** and showcasing skills in interviews and portfolios.

---

## 🧩 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt.js

### Frontend
- React.js / Next.js
- Axios / Fetch API
- React Hooks
- CSS / Tailwind / Bootstrap

---

## 🔐 Backend Features

### 1. User Authentication
- User signup
- User login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes for authorized users only

---

### 2. Follow System
- Follow another user
- Unfollow a user
- Maintain followers and following relationships
- Prevent duplicate follow actions

---

### 3. Post Creation
- Only authenticated users can create posts
- Each post contains:
  - Image URL
  - Caption
  - Author information
  - Creation timestamp

---

### 4. Likes System
- Like a post
- Unlike a post
- Ensure a user can like a post only once

---

### 5. Comments
- Add comments to posts
- Each comment shows:
  - Comment text
  - Comment author
  - Comment timestamp

---

### 6. Feed System
- Personalized feed API
- Displays posts from users the logged-in user follows
- Latest posts shown first

---

## 🎨 Frontend Features

### Screens Implemented

| Screen | Description |
|------|-------------|
| Login & Signup | User authentication, token storage, redirection |
| Home Feed | Display posts, likes, and comments dynamically |
| Create Post | Form to create new posts with image URL and caption |
| Profile Page | User profile with posts and follower/following count |
| Post Detail | Full post view with interactive like and comment system |

---

### UI & UX
- Responsive layout
- Clean and minimal design
- State-based updates without page refresh
- Dynamic data rendering

---

## 📁 Project Structure

instagram-mini-clone/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── styles/
│ ├── App.js / index.js
│ └── package.json
│
├── README.md
└── .gitignore

yaml
Copy code

---

## 🔑 API Endpoints

### Authentication
POST /api/auth/signup
POST /api/auth/login

shell
Copy code

### Users
POST /api/users/:id/follow
POST /api/users/:id/unfollow
GET /api/users/:id/profile

shell
Copy code

### Posts
POST /api/posts
GET /api/posts/feed
GET /api/posts/:id

shell
Copy code

### Likes
POST /api/posts/:id/like
POST /api/posts/:id/unlike

shell
Copy code

### Comments
POST /api/posts/:id/comment

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

yaml
Copy code

---

## 🛠 Installation & Setup

### Backend Setup
```bash
cd backend
npm install
npm start
Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
📌 Future Enhancements
Image upload using Cloudinary

Stories feature

Real-time notifications

Chat and messaging system

Search users and posts

Dark mode UI

Pagination and infinite scroll

🧪 Learning Outcomes
RESTful API development

Authentication and authorization using JWT

MongoDB schema design and relationships

React state management

Full-stack project architecture

👨‍💻 Author
Yuvraj  Singh Tomar
B.Tech – Computer Science (Data Science)
Indore, India

⭐ Support
If you find this project useful:

⭐ Star the repository

🍴 Fork it

🛠 Contribute improvements

📜 License
This project is licensed under the MIT License.
Free to use for educational and learning purposes.