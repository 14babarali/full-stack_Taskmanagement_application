// components/UserCreationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'; 

function UserCreationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${config.apiBaseUrl}/api/users/create`, // Ensure this matches your backend endpoint
        { email, password, role },
        { headers: { 'x-auth-token': token } }
      );
      alert('User created successfully!');
      // Reset form or handle UI state after creation
      setEmail('');
      setPassword('');
      setRole('user');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold">Create a New User</h3>
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User Email"
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="User Password"
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="manager">Manager</option>
          <option value="user">Regular User</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-6 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Create User
      </button>
    </form>
  );
}

export default UserCreationForm;
