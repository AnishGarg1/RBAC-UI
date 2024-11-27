import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './components/Navbar';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
import Dashboard from './pages/Dashboard';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogPage from './pages/BlogPage';
import { ROLE } from './utils/constants';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './components/Admin/ManageUser';
import ManageBlogs from './components/Admin/ManageBlogs';
import { useSelector } from 'react-redux';
import AuthorBlogs from './pages/AuthorBlogs';
import UpdateBlog from './pages/UpdateBlog';

function App() {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
      {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}
      
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route 
          path='/login' 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/signup' 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
        
        <Route 
          path='/dashboard' 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

        <Route
          path='/blog/:blogId'
          element={
            <PrivateRoute>
              <BlogPage/>
            </PrivateRoute>
          }
        />

        {
          user?.role === ROLE.ADMIN && (
            <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/blogs" element={<ManageBlogs />} />
            </>
          )
        }

        {
          user?.role === ROLE.AUTHOR && (
            <>
            <Route path="/blogs" element={<AuthorBlogs />} />
            <Route path="/blogs/:blogId" element={<UpdateBlog />} />
            </>
          )
        }
        
        <Route path='/contact' element={<div className='w-full flex justify-center border-2'>Contact</div>}/>
        <Route path='/about' element={<div className='w-full flex justify-center border-2'>About us</div>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
