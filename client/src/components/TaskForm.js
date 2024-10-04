import React, { useState } from 'react';
import axios from 'axios';
import config from '../config'; 
function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `${config.apiBaseUrl}/api/tasks`,
        { title, description, dueDate, status },
        { headers: { 'x-auth-token': token } }
      );
      fetchTasks(); // Refresh task list after adding
      setTitle('');
      setDescription('');
      setDueDate('');
      setStatus('pending');
    } catch (error) {
      console.error(error);
      alert('Failed to create task');
    }
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
