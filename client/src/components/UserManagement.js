// components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config'; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${config.apiBaseUrl}/api/users`, {
      headers: { 'x-auth-token': token },
    });
    setUsers(res.data);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        `${config.apiBaseUrl}/api/users`, 
        { username, email, role },
        { headers: { 'x-auth-token': token } }
      );
      fetchUsers(); // Refresh the user list
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">User Management</h1>
      <form onSubmit={handleCreateUser} className="mt-6">
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="block w-full px-4 py-2 border rounded-md mb-2"
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full px-4 py-2 border rounded-md mb-2"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md mb-2"
        >
          <option value="user">Regular User</option>
          <option value="manager">Manager</option>
        </select>
        <button 
          type="submit" 
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
      <h2 className="mt-8 text-2xl font-semibold">Existing Users</h2>
      <ul className="mt-4">
        {users.map(user => (
          <li key={user.id} className="flex justify-between p-2 border-b">
            <span>{user.username} - {user.email} ({user.role})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
