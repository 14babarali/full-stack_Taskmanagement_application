// components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import config from '../config'; 

function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${config.apiBaseUrl}/api/tasks/me`, { // API to fetch user's own tasks
      headers: { 'x-auth-token': token },
    });
    setTasks(res.data);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default UserDashboard;
