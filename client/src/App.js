// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import NotFound from './components/NotFound'; // Ensure you have this component
// import ProtectedRoute from './components/ProtectedRoute'; // Ensure you have this component
// import Signup from './components/Signup'; 
// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
//                 <Route path="*" element={<NotFound />} />
//                 <Route path="/signup" element={<Signup />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup'; 
import UserManagement from './components/UserManagement'; // Import UserManagement component
import ManagerDashboard from './components/ManagerDashboard'; // Import ManagerDashboard
import UserDashboard from './components/UserDashboard'; // Import UserDashboard
import LandingPage from './pages/LandingPage';
const App = () => {
    return (
        <Router>
            <Routes>
            
            <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<ProtectedRoute component={Signup} />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/user-management" element={<ProtectedRoute component={UserManagement} />} /> {/* Admin route */}
                <Route path="/manager-dashboard" element={<ProtectedRoute component={ManagerDashboard} />} /> {/* Manager route */}
                <Route path="/user-dashboard" element={<ProtectedRoute component={UserDashboard} />} /> {/* User route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
