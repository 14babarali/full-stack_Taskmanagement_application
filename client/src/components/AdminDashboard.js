import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';  // Correct default import
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import config from '../config';
import UserCreationForm from './UserCreationForm';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(''); // Handle error messages

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.user && decoded.user.role) {
          setRole(decoded.user.role);
          fetchTasks(token);  // Pass the token directly
        } else {
          setError('Invalid token structure.');
        }
      } catch (err) {
        setError('Invalid token.');
      }
    } else {
      setError('No token found, please login.');
    }
  }, []);

  const fetchTasks = async (token) => {
    try {
      const res = await axios.get(`${config.apiBaseUrl}/api/tasks`, {
        headers: { 'x-auth-token': token }, // Sending token in header
      });
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch tasks.');
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="p-6 bg-red-50 min-h-screen"><h2 className="text-red-500">{error}</h2></div>;
  }

  if (isLoading) {
    return <div className="p-6 min-h-screen"><h2>Loading tasks...</h2></div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Welcome to the Task Manager</h1>
      <h2 className="mt-2 text-lg text-center">Role: {role}</h2>
      
      {role === 'admin' && (
        <div className="mt-6">
          <UserCreationForm />
          <TaskForm fetchTasks={() => fetchTasks(localStorage.getItem('token'))} />
        </div>
      )}

      <TaskList tasks={tasks} fetchTasks={() => fetchTasks(localStorage.getItem('token'))} />
    </div>
  );
}

export default Dashboard;
