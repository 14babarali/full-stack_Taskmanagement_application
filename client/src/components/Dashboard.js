// //components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';


// import TaskList from './TaskList';
// import TaskForm from './TaskForm';
// import config from '../config'; 


// function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = jwtDecode(token);
//       setRole(decoded.user.role);
//       fetchTasks();
//     }
//   }, []);

//   const fetchTasks = async () => {
//     const token = localStorage.getItem('token');
//     const res = await axios.get(`${config.apiBaseUrl}/api/tasks`, {
//       headers: { 'x-auth-token': token },
//     });
//     setTasks(res.data);
//   };

//   // Fixed template string
//   console.log(`API Base URL: ${config.apiBaseUrl}`, `${config.apiBaseUrl}`);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-center">Welcome to the Task Manager</h1>
//       <h2 className="mt-2 text-lg text-center">Role: {role}</h2>
//       {role !== 'user' && (
//         <div className="mt-6">
//           <TaskForm fetchTasks={fetchTasks} />
//         </div>
//       )}
//       <TaskList tasks={tasks} fetchTasks={fetchTasks} />
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import config from '../config'; 
import UserCreationForm from './UserCreationForm';
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.user.role);
      fetchTasks();
    }
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
      <h1 className="text-3xl font-bold text-center">Welcome to the Task Manager</h1>
      <h2 className="mt-2 text-lg text-center">Role: {role}</h2>
      
      {role === 'admin' && ( // Only admin can create tasks
        <div className="mt-6">
          <UserCreationForm />
          <TaskForm fetchTasks={fetchTasks} />
        </div>
      )}
      
      <TaskList tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
}

export default Dashboard;
