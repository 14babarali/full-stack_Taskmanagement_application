import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Task Management App
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage your tasks, track progress, and collaborate efficiently with our full-stack task management app.
          </p>
          <a href="/login" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="flex flex-wrap justify-around">
            <div className="w-full md:w-1/3 p-6">
              <h3 className="text-xl font-semibold">Task Organization</h3>
              <p className="mt-4">
                Organize tasks efficiently by creating projects, subtasks, and deadlines with ease.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <h3 className="text-xl font-semibold">Collaboration</h3>
              <p className="mt-4">
                Work together with your team, assign tasks, and track progress in real-time.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-6">
              <h3 className="text-xl font-semibold">Progress Tracking</h3>
              <p className="mt-4">
                Monitor task completion and visualize project progress at a glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Step 1: Create a Project</h3>
                <p>Start by creating a new project for your task management workflow.</p>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Step 2: Add Tasks</h3>
                <p>Create tasks and subtasks with deadlines and priorities to manage your workload.</p>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Step 3: Track and Collaborate</h3>
                <p>Assign tasks to team members, track progress, and work collaboratively.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">App Screenshots</h2>
          <div className="flex justify-around">
            <img src="/screenshot1.png" alt="screenshot1" className="w-1/3 rounded-lg shadow-lg"/>
            <img src="/screenshot2.png" alt="screenshot2" className="w-1/3 rounded-lg shadow-lg"/>
            <img src="/screenshot3.png" alt="screenshot3" className="w-1/3 rounded-lg shadow-lg"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2024 Task Management App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
