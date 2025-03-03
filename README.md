# Cineverse - Movie Website

Cineverse is a full-stack movie website built with **Node.js, Express, MongoDB, and EJS**. It features an **Admin Panel** for managing movies (CRUD operations) and a **Client Side** for users to browse movies.

## 🌐 Live Demo
[Movies Website](https://movies-zsd5.onrender.com)

- By default, it opens the **Client Side**.
- To access the **Admin Panel**, navigate to `/admin` in the URL.

## ✨ Features

### 🎬 Client Side:
- View movies with details (name, genre, rating, description, etc.).
- Browse movies in different categories.
- Responsive UI with header, footer, and movie listings.

### 🛠️ Admin Side:
- **Create**: Add new movies with a **thumbnail & slider image**.
- **Read**: View all movies in the database.
- **Update**: Edit existing movie details.
- **Delete**: Remove movies along with their images.
- **Authentication**: Admin login & session management.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Templating Engine**: EJS
- **Middleware**: Multer (for file uploads), Cookie-parser (for authentication)
- **Hosting**: Render

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/cineverse.git
cd cineverse
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/movies
PORT=5000
SESSION_SECRET=your_secret_key
```

### 4️⃣ Run the Project
```bash
npm start
```

The app will be live at `http://localhost:5000`

## 🔑 Default Admin Credentials
- **Username**: admin
- **Password**: admin123

## 📂 Folder Structure
```
Cineverse/
│-- config/
│   ├── database.js  # MongoDB connection setup
│-- controller/
│   ├── movieController.js  # Handles all movie-related logic
│-- middleware/
│   ├── multerMiddleware.js  # File upload handling
│   ├── redirectMiddleware.js  # Redirect logic
│   ├── userAuth.js  # Authentication middleware
│-- models/
│   ├── adminSchema.js  # Admin schema
│   ├── movieSchema.js  # Movie schema
│-- public/  # Static assets (CSS, JS, images)
│-- router/
│   ├── movieRouter.js  # Routes for handling requests
│-- views/
│   ├── pages/  # EJS templates (about.ejs, contact.ejs, etc.)
│   ├── partials/  # Header, footer partials
│   ├── clientIndex.ejs  # Client home page
│   ├── index.ejs  # Admin home page
│-- uploads/  # Stores uploaded images
│-- index.js  # Main server file
│-- package.json  # Project metadata & dependencies
```

## 🎯 Usage Guide
- **Access Client Side**: Open [`movies-zsd5.onrender.com`](https://movies-zsd5.onrender.com)
- **Access Admin Panel**: Go to [`movies-zsd5.onrender.com/admin`](https://movies-zsd5.onrender.com/admin) and log in using the **Admin Credentials**.
- **Manage Movies**: Add, update, or delete movies in the Admin Panel.

---

Enjoy using **Cineverse**! 🎬🍿

