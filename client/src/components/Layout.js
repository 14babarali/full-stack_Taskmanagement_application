// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 min-h-screen p-5">
        <h2 className="text-2xl font-bold mb-5">Task Management</h2>
        <nav>
          <ul>
            <li className="mb-3">
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/users" className="hover:underline">
                Users
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/tasks" className="hover:underline">
                Tasks
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        <header className="bg-white shadow-md p-4 mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
