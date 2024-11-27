import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogPage from "./pages/BlogPage";
import { ROLE } from "./utils/constants";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUser";
import ManageBlogs from "./components/Admin/ManageBlogs";
import { useSelector } from "react-redux";
import AuthorBlogs from "./pages/AuthorBlogs";
import UpdateBlog from "./pages/UpdateBlog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/:blogId"
            element={
              <PrivateRoute>
                <BlogPage />
              </PrivateRoute>
            }
          />
          {user?.role === ROLE.ADMIN && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/blogs" element={<ManageBlogs />} />
            </>
          )}
          {user?.role === ROLE.AUTHOR && (
            <>
              <Route path="/blogs" element={<AuthorBlogs />} />
              <Route path="/blogs/:blogId" element={<UpdateBlog />} />
            </>
          )}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
