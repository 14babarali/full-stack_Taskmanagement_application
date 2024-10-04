// src/pages/Dashboard.js
import React from 'react';
import Slider from '../components/Slider';

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <Slider /> {/* Add the slider here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-gray-600">Manage your users here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Tasks</h3>
          <p className="text-gray-600">View and manage tasks.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Statistics</h3>
          <p className="text-gray-600">Overview of your statistics.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
