

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after signup

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `http://localhost:5000/api/auth/register`,
        { username, email, password, role },
        { headers: { 'x-auth-token': token } }
      );
      alert('User created successfully');
      navigate('/dashboard'); // Redirect to dashboard after signup
    } catch (error) {
      console.error('Signup error:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <form onSubmit={handleSignup} className="mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="user">Regular User</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
