import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/apiUtils/authAPI';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Reader", // Default role is "Reader"
  });

  const navigate = useNavigate();

  const [isPassMatch, setIsPassMatch] = useState(false);

  const { firstName, lastName, email, password, confirmPassword, role } = formData;

  const handleChangeForm = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPassMatch) {
      toast.error("Password do not match");
      return;
    }
    await signup(
      firstName,
      lastName,
      email,
      password,
      role, // Include role in the signup API request
      navigate,
    );
  };

  useEffect(() => {
    if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
      setIsPassMatch(true);
    } else {
      setIsPassMatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className='flex items-center justify-center mt-10'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 ease-in-out opacity-100 animate__fadeIn'>
        <h2 className='text-2xl font-semibold mb-4 text-center text-gray-800'>
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
                  First Name
                </label>
                <input
                  required
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={firstName}
                  className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
                  placeholder='Enter first name'
                  onChange={handleChangeForm}
                />
              </div>

              <div>
                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
                  Last Name
                </label>
                <input
                  required
                  id='lastName'
                  type='text'
                  name='lastName'
                  value={lastName}
                  className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
                  placeholder='Enter last name'
                  onChange={handleChangeForm}
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                required
                type='email'
                id='email'
                name='email'
                value={email}
                className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
                placeholder='Enter email'
                onChange={handleChangeForm}
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                required
                type='password'
                id='password'
                name='password'
                value={password}
                className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
                placeholder='Enter password'
                onChange={handleChangeForm}
              />
            </div>

            <div>
              <div className='flex w-full items-center justify-between'>
                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                  Confirm Password
                </label>
                {isPassMatch && (
                  <div className='mr-1'>
                    <FaRegCheckCircle className='text-green-500' />
                  </div>
                )}
              </div>

              <input
                required
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
                placeholder='Enter confirm password'
                onChange={handleChangeForm}
              />
            </div>

            {/* Role selection */}
            <div>
              <label htmlFor='role' className='block text-sm font-medium text-gray-700'>
                Role
              </label>
              <select
                id='role'
                name='role'
                value={role}
                onChange={handleChangeForm}
                className='border-2 w-full px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800'
              >
                <option value="Reader">Reader</option>
                <option value="Author">Author</option>
              </select>
            </div>

            <div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none'
              >
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
