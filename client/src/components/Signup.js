// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'; 

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user', // Default role
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.apiBaseUrl}/api/auth/signup`, formData);
            alert(response.data.message);
            // Handle success (e.g., redirect to login or dashboard)
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error signing up');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div>
                <label htmlFor="username" className="block">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="role" className="block">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border p-2"
                >
                    <option value="user">Regular User</option>
                    <option value="manager">Manager</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2">Sign Up</button>
        </form>
    );
};

export default Signup;
