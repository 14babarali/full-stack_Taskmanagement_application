// src/pages/Dashboard.js
import Slider from '../components/Slider';
import AdminDashboard from '../components/AdminDashboard';
import Signup from '../components/Signup';
import React, { useState } from 'react';

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Welcome to the Dashboard',
      content: 'Track your tasks and manage your team efficiently.',
      bgColor: 'bg-blue-300',
    },
    {
      id: 2,
      title: 'Slide 2',
      content: 'Your message or information goes here.',
      bgColor: 'bg-green-300',
    },
    {
      id: 3,
      title: 'Slide 3',
      content: 'Your message or information goes here.',
      bgColor: 'bg-red-300',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
        <nav>
          <ul>
            <li className="mb-3">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Dashboard</a>
            </li>
            <li className="mb-3">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Tasks</a>
            </li>
            <li className="mb-3">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Teams</a>
            </li>
            <li className="mb-3">
              <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Settings</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        
        {/* Slider */}
        <Slider slides={slides} currentSlide={currentSlide} nextSlide={nextSlide} prevSlide={prevSlide} />

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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

        {/* Additional Components */}
        <AdminDashboard />
        {/* <Signup /> */}
      </main>
    </div>
  );
};

export default Dashboard;
