// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import TaskForm from './TaskForm'; // Import TaskForm to create tasks

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // For error handling

  // Function to fetch tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${config.apiBaseUrl}/api/tasks`, {
        headers: { 'x-auth-token': token },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`${config.apiBaseUrl}/api/tasks/${taskId}`, {
        headers: { 'x-auth-token': token },
      });
      fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error("Error deleting task", error);
      alert('Failed to delete task');
    }
  };

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <TaskForm fetchTasks={fetchTasks} /> {/* Include the TaskForm */}
      <h3 className="text-xl font-semibold mt-6">Task List</h3>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? ( // Handle error state
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="mt-4">
          {tasks.length === 0 ? ( // Check if there are no tasks
            <p>No tasks available.</p>
          ) : (
            tasks.map(task => (
              <li key={task._id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h4 className="font-bold">{task.title}</h4>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  <p className="text-gray-500">Status: {task.status}</p>
                </div>
                <div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  {/* Placeholder for Edit button */}
                  <button
                    onClick={() => console.log(`Edit task: ${task._id}`)} // Placeholder for edit functionality
                    className="ml-4 text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
