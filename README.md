# 🏨 Hotel Booking Web Application

A full-stack hotel booking platform inspired by **Hotels.com**, developed with **Vue.js** for the frontend, **Node.js/Express** for the backend, and **MongoDB** for the database.

> 🟢 Deployed on Render for both frontend and backend.

## 🌐 Live Demo

- **Frontend:** https://hotel-booking-frontend-4djb.onrender.com  
- **Backend API:** https://hotel-booking-app-brxd.onrender.com

## 🚀 Features

### 👤 User Registration & Login
- Register with:
  - Email
  - Password (min. 8 characters, includes 1 number & 1 special character)
  - Country & City
  - Optional profile photo upload
- Secure password storage using **bcrypt** (one-way hashing)

### 🔍 Hotel Search & Discovery
- Search hotels by **city**, **check-in date**, and **guest count**
- Hotel cards display:
  - Name, price, discount
  - Amenities
  - Comment count
  - Member-only pricing & offers

### 🏨 Hotel Detail Page
- Full hotel information & amenities
- Amenities and service scores visualized as **bar charts** (using Chart.js)
- Embedded **Google Maps** to show hotel location
- User comments and service rating graphs

### 📝 Comments & Ratings
- Users can submit comments
- Ratings are visualized with a **bar chart**

### 🎨 Modern & Responsive UI
- Mobile-first and fully **responsive design**
- Optimized layout for all screen sizes (desktop, tablet, mobile)
- Styled with a modern approach inspired by Hotels.com
- Clean navigation bar, search banner, and grid-based hotel layout

## 🛠️ How to Run Locally

1. Clone the Repositories  
```bash
git clone https://github.com/yourusername/hotel-booking-app.git
git clone https://github.com/yourusername/hotel-booking-frontend.git
```

2. Backend Setup  
```bash
cd hotel-booking-app
npm install
# Create a .env file and set your environment variables (e.g., MONGO_URL, JWT_SECRET)
node index.js
```

3. Frontend Setup  
```bash
cd hotel-booking-frontend
npm install
# Create a .env file and set VITE_API_BASE_URL to your backend URL
npm run dev
```

## 📦 Technologies Used

### 🔧 Frontend
- Vue.js 3
- Chart.js
- Axios
- Google Maps API

### ⚙️ Backend
- Node.js
- Express
- MongoDB + Mongoose
- bcrypt
- Multer (for photo uploads)
- JWT

### 🚀 Deployment
- Render

## 🎬 Demo Video

You can watch a short demo of the application from the link below:

[▶️ View Demo on Google Drive](https://drive.google.com/drive/folders/1Hddk7fIpCHxugVW54KTnVKN9GIGkxDvd?usp=sharing)


