// import React, { useState } from 'react';
// import axios from 'axios';
// // import config from '../config'; 
// // src/components/Login.js
// import { useNavigate } from 'react-router-dom'; // Corrected import

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
//         console.log(res.data);  // Log the response data
//         console.log('Login response:', res.data);
//         localStorage.setItem('token', res.data.token);
//         history.push('/dashboard');
//     } catch (err) {
//         console.error('Login error:', err.response?.data || err.message); // Improved error logging
//         alert('Invalid credentials');
//     }
// };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center">Login</h2>
//         <form onSubmit={handleLogin} className="mt-6">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mt-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Corrected import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Updated variable name

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
      console.log(res.data);  // Log the response data
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Use navigate instead of history.push
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message); // Improved error logging
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

