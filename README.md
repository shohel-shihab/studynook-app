# 📚 StudyNook

StudyNook is a modern Study Room Booking Platform that helps students and professionals find, book, and manage study spaces efficiently. Users can browse available rooms, view detailed information, make bookings, and manage their reservations through an intuitive and responsive interface.

## 🌐 Live Site

🔗 https://your-live-site-url.com

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration and Login
* JWT-based Authentication
* Protected Routes
* Secure API Access
* Session Management

### 🏢 Study Room Management

* Add New Study Rooms
* Update Room Information
* Delete Existing Rooms
* View Room Details
* Room Ownership Verification

### 🔍 Search & Filtering

* Search Rooms by Name
* Filter by Price Range
* Filter by Amenities
* Real-time Filtering
* Responsive Grid Layout

### 📖 Room Details

* Room Image
* Room Name
* Detailed Description
* Floor Information
* Seat Capacity
* Hourly Rate
* Amenities List
* Booking Count

### 📅 Booking System

* Book Available Rooms
* Date Selection
* Time Slot Selection
* Conflict Detection
* Automatic Cost Calculation
* Booking Confirmation
* Booking Status Tracking

### 👤 User Dashboard

* View Personal Bookings
* Manage Bookings
* Cancel Future Bookings
* View Owned Rooms
* Edit Room Information

### 🎨 User Experience

* Fully Responsive Design
* Modern UI with Hero UI
* Smooth Animations using Framer Motion
* Toast Notifications
* Dynamic Page Titles
* Professional Card Design

---

## 🛠️ Technologies Used

### Frontend

* Next.js
* React.js
* Tailwind CSS
* Hero UI
* React Icons
* Framer Motion
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas

---

## 📦 NPM Packages

### Client Side

```bash
npm install @heroui/react
npm install react-icons
npm install framer-motion
npm install react-hot-toast
npm install jwt-decode
```

### Server Side

```bash
npm install express
npm install mongodb
npm install jsonwebtoken
npm install cors
npm install dotenv
```

---

## 📂 Project Structure

```txt
StudyNook
│
├── app
│   ├── rooms
│   ├── my-bookings
│   ├── my-listings
│   ├── add-room
│   ├── login
│   └── register
│
├── components
│   ├── Navbar
│   ├── Footer
│   ├── RoomCard
│   ├── BookRoomModal
│   ├── MyBookingCard
│   └── DeleteRoomButton
│
├── public
│
├── server
│   ├── routes
│   ├── middleware
│   └── database
│
└── README.md
```

---

## ⚙️ Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Server (.env)

```env
PORT=5000

DB_USER=your_database_user
DB_PASS=your_database_password

JWT_SECRET=your_secret_key
```

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/studynook.git
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
npm install
```

### Run Frontend

```bash
npm run dev
```

### Run Backend

```bash
nodemon index.js
```

---

## 📱 Responsive Design

StudyNook is fully responsive and optimized for:

* 📱 Mobile Devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop Screens

---

## 🎯 Future Improvements

* Google Authentication
* Room Reviews & Ratings
* Admin Dashboard
* Email Notifications
* Payment Integration
* Favorite Rooms
* Advanced Search System

---

## 👨‍💻 Author

**Shohel Rana Shihab**

Department of Computer Science & Engineering

Green University of Bangladesh

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
