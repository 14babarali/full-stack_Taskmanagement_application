// components/ManagerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm'; 
import config from '../config'; 

function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${config.apiBaseUrl}/api/tasks`, {
      headers: { 'x-auth-token': token },
    });
    setTasks(res.data);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">Manager Dashboard</h1>
      <div className="mt-6">
        <TaskForm fetchTasks={fetchTasks} />
      </div>
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default ManagerDashboard;
