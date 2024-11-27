# Blog Access Control System

A role-based access control (RBAC) system for blog management, where users can have different permissions based on their roles: **Admin**, **Author**, and **Reader**. This system allows management of blog content with different levels of access based on the user’s role.

The application is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and integrates **JWT authentication** for secure user access to various functionalities.

---

## Live Demo

You can explore the live demo of the **Blog Access Control System** here:

[**Accessly Demo**](https://accessly.netlify.app/)

### Admin Login Credentials for Demo

To access the admin features in the demo, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

> **Note**: The **signup** process is available for **Author** and **Reader** roles only.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [System Architecture](#system-architecture)
5. [Installation & Setup](#installation-setup)
6. [How to Use](#how-to-use)
7. [Folder Structure](#folder-structure)
8. [Future Enhancements](#future-enhancements)
9. [License](#license)

---

## Project Overview

The **Blog Access Control System** is designed to manage blog posts with role-based access control (RBAC). Users are assigned one of three roles (**Admin**, **Author**, or **Reader**), each having different permissions for interacting with the content.

- **Admins** have full control over the system, including managing users and blog posts.
- **Authors** can create, update, and delete their own blog posts.
- **Readers** can only view the blog posts without making any changes.

This system is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **JWT authentication** for secure user management.

---

## Features

- **Role-Based Access Control (RBAC)**: Users can have one of three roles with different access permissions:
  - **Admin**: Can manage all users and blog posts.
  - **Author**: Can create, edit, and delete their own blog posts.
  - **Reader**: Can view all blog posts but cannot modify them.
  
- **Authentication & Authorization**: Secure login using **JWT** and password hashing with **bcrypt**.

- **Blog Management**: Admins and authors can manage blog posts, including creation, editing, and deletion.
  
- **Search**: Users can search for blog posts by title or description.
  
- **Responsive UI**: Built with **React.js** and **Tailwind CSS** to ensure a modern and mobile-friendly design.

- **User Dashboard**: Admins have access to a dashboard for managing users and viewing statistics.

---

## Technologies Used

- **Frontend**:
  - React.js (for UI components)
  - React Router DOM (for navigation)
  - Tailwind CSS (for modern and responsive design)
  - Redux (for state management)
  - Axios (for making API requests)

- **Backend**:
  - Node.js (for server-side logic)
  - Express.js (for routing and API creation)
  - MongoDB (for storing blog posts and user data)
  - Mongoose (to interact with MongoDB)

- **Authentication & Security**:
  - JWT (JSON Web Token) for secure authentication
  - bcrypt for password hashing

---

## System Architecture

The system follows a **Role-Based Access Control** model to grant permissions based on user roles. Here's a basic overview of the architecture:

### Frontend:
- **React.js** handles the user interface and interactions.
- **Axios** is used to make API requests to the backend.
- **Redux** manages application-wide state such as user authentication and blog data.

### Backend:
- **Node.js** and **Express.js** manage the API logic and routing.
- **MongoDB** stores user information and blog posts.
- **JWT Authentication** ensures only authorized users can access protected routes.

### Architecture Diagram:

```
+------------+     +--------------+     +-------------+
|   React    | <---> |   Express   | <---> |  MongoDB   |
|   Client   |     |   Server    |     |   Database |
+------------+     +--------------+     +-------------+
        ^                   |                       |
        |                   |                       |
        +-------------------+-----------------------+
                     JWT Authentication & API Requests
```

---

## Installation & Setup

### Prerequisites:
Make sure you have the following installed:
- **Node.js** (v16.x or higher)
- **MongoDB** (either local or MongoDB Atlas)
- **npm** (Node package manager)

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/blog-access-control-system.git
cd blog-access-control-system
```

### Step 2: Install dependencies

#### Frontend Setup:

1. Navigate to the `src` directory:

```bash
cd src
```

2. Install frontend dependencies:

```bash
npm install
```

#### Backend Setup:

1. Navigate to the `server` directory:

```bash
cd server
```

2. Install backend dependencies:

```bash
npm install
```

### Step 3: Setup Environment Variables

#### Backend Environment Variables:

1. Create a `.env` file in the `server` directory and add the following contents:

```env
MONGO_URI=mongodb://your-mongo-db-uri
JWT_SECRET=your-jwt-secret-key
PORT=5000
```

2. **Admin Credentials for Demo**:

To log in as an **Admin** for testing, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

> **Note**: The **signup** process is available for **Author** and **Reader** roles only.

#### Frontend Environment Variables:

1. For the **client**, create a `.env` file and add the following to store the API server URL:

```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Run the Application

1. Start the backend server:

```bash
cd server
npm start
```

2. Start the frontend development server:

```bash
cd src
npm start
```

Visit `http://localhost:3000` to access the application in your browser.

---

## How to Use

### User Roles:

- **Admin**:
  - Full control over blog posts and users.
  - Can view and manage all users.
  - Can create, edit, or delete blog posts.

- **Author**:
  - Can create, edit, and delete their own blog posts.
  - Can view all blog posts.

- **Reader**:
  - Can view blog posts but cannot edit or delete any content.

### Authentication:

- **Login**: Users must log in to access the system. Upon successful login, they will receive a JWT token, which is used to authenticate subsequent requests.
  - **Admin login credentials** for demo:  
    - **Email**: `admin@gmail.com`
    - **Password**: `Admin@123`
  - **Signup** is available for **Author** and **Reader** roles only.

---

## Folder Structure

```
blog-access-control-system/
│
├── src/                   # Frontend (React.js)
│   ├── components/        # React components (BlogCard, BlogPage, etc.)
│   ├── pages/             # Pages (Home, CreateBlog, etc.)
│   ├── services/          # Axios API utility files
│   ├── store/             # Redux store (user auth, blog data)
│   │   └── App.js         # Main React entry point
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend (Node.js, Express.js)
│   ├── controllers/       # Controller functions (auth, blogs, users)
│   ├── models/            # Mongoose models (Blog, User, etc.)
│   ├── routes/            # Express routes (auth, blogs, users)
│   ├── middleware/        # JWT & Role-based access middleware
│   ├── server.js          # Backend entry point
│   └── package.json       # Backend dependencies
│
├── .env                   # Environment variables (MongoDB URI, JWT secret) - for the backend
├── package.json           # Project dependencies
├── .env                   # Client-side environment variable (API URL)
├── public/                # Public assets (icons, images)
├── package-lock.json      # Lock file for dependencies
└── README.md              # Project documentation
```

---

## Future Enhancements

- **User Permissions**: Implement more granular permissions for roles.
- **Commenting System**: Allow users to comment on blog posts.
- **Advanced Admin Dashboard**: Add advanced admin functionalities such as analytics or content moderation tools.
- **Rich Text Editor**: Provide a rich text editor for blog post creation.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.