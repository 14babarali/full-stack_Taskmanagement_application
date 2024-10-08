// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/users`, {
          headers: { 'x-auth-token': token },
        });

        // Check the response structure
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Assuming the response is an array of users
        } else {
          console.error("Unexpected response structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${config.apiBaseUrl}/api/tasks`,
        { title, description, dueDate, status, assignedUsers },
        { headers: { 'x-auth-token': token } }
      );
      fetchTasks();
      // Reset form fields
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
      setAssignedUsers([]);
    } catch (error) {
      console.error("Error creating task", error);
      alert('Failed to create task');
    }
  };

  const handleUserChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setAssignedUsers(selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold">Create a New Task</h3>
      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Assign Users</label>
        <select
          multiple
          value={assignedUsers}
          onChange={handleUserChange}
          className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          {users.length > 0 ? (
            users.map(user => (
              <option key={user._id} value={user._id}>
                {user.email} 
              </option>
            ))
          ) : (
            <option value="" disabled>Loading users...</option>
          )}
        </select>
      </div>

      <button
        type="submit"
        className="mt-6 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
