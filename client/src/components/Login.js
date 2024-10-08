//components/login.js



import React, { useState } from 'react'; // Import useState
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      const userRole = jwtDecode(res.data.token).user.role; // Get role from token
      
      // Redirect based on role
      if (userRole === 'admin') {
        // navigate('/user-management');
        navigate('/dashboard');

      } else if (userRole === 'manager') {
        navigate('/manager-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
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
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

