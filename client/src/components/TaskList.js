import React from 'react';
import axios from 'axios';
import config from '../config'; 

function TaskList({ tasks, fetchTasks }) {
  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`${config.apiBaseUrl}/api/tasks/${taskId}`, {
      headers: { 'x-auth-token': token },
    });
    fetchTasks(); // Refresh task list after deletion
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Your Tasks</h3>
      <div className="mt-4">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id} className="p-4 bg-white rounded-md shadow-md">
                <h4 className="font-bold">{task.title}</h4>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TaskList;
