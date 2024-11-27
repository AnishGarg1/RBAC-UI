import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiUtils/authAPI';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const handleChangeForm = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, dispatch, navigate);
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-500 ease-in-out opacity-100 animate__fadeIn">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 transition-transform">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm block font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            required
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChangeForm}
                            placeholder="Enter email"
                            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm block font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            required
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChangeForm}
                            placeholder="Enter Password"
                            className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out text-gray-800"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
