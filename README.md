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
git clone https://github.com/AnishGarg1/RBAC-UI.git
cd RBAC-UI
```

### Step 2: Install dependencies

Run the following command in the project root directory to install all dependencies for both frontend and backend:

#### Frontend Setup:

1. Install frontend dependencies:

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
PORT=4000
```

2. **Admin Credentials for Demo**:

To log in as an **Admin** for testing, use the following credentials:

- **Email**: `admin@gmail.com`
- **Password**: `Admin@123`

> **Note**: The **signup** process is available for **Author** and **Reader** roles only.

#### Frontend Environment Variables:

1. For the **client**, create a `.env` file and add the following to store the API server URL:

```env
REACT_APP_API_URL=http://localhost:4000/api/v1
```

### Step 4: Run the Application

To run both the client and server simultaneously, run the following command from the root folder:

```bash
npm run dev
```

This will start both the backend server and the frontend React development server.

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
your-project/
│
├── /node_modules            # Node.js modules (for both client and server)
├── /public                  # Static assets (index.html, images, etc.)
├── /client                  # React client-side source code
│   ├── /assets              # Static files like images, icons, etc.
│   ├── /components          # Reusable UI components
│   │   ├── /Admin           # Admin-related components (e.g., ManageUsers.jsx)
│   │   └── /Common          # Common components (e.g., Header, Footer, Modal, etc.)
│   ├── /hooks               # Custom React hooks (e.g., useAuth, useFetch)
│   ├── /redux               # Redux files
│   │   ├── /features        # Redux slices for different features (e.g., usersSlice)
│   │   ├── /store.js        # Store configuration
│   ├── /services            # Services for API calls
│   │   ├── /adminAPI.js     # API utilities (e.g., getAllUsers, switchUserRole, etc.)
│   ├── /utils               # Utility functions and constants
│   ├── /views               # Views or pages (e.g., Dashboard, Profile)
│   ├── App.jsx              # Main app component
│   ├── index.js             # React entry point
│
├── /server                  # Backend Node.js API
│   ├── /controllers         # Express controllers for handling routes (e.g., userController.js)
│   ├── /middlewares         # Custom Express middlewares (e.g., authMiddleware.js)
│   ├── /models              # MongoDB models (e.g., User.js)
│   ├── /routes              # Express routes (e.g., userRoutes.js)
│   ├── /services            # Backend services (e.g., userService.js)
│   ├── /utils               # Utility functions (e.g., token generation, password hashing)
│   ├── /config              # Configuration files (e.g., database.js, keys.js)
│   ├── server.js            # Main backend entry point
│
├── .env                     # Environment

 variables for backend
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

---

## Future Enhancements

- **Email Notifications**: Implement email notifications for user registration and password resets.
- **Testing**: Add unit and integration tests for both frontend and backend.
- **Role Management**: Allow more customizable roles for users (e.g., Editor, Contributor).
- **Blog Categories**: Implement blog categories to organize blog posts.

---

## License

This project is licensed under the MIT License.