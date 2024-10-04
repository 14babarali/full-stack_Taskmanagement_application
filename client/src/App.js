// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound'; // Ensure you have this component
import ProtectedRoute from './components/ProtectedRoute'; // Ensure you have this component
import Signup from './components/Signup'; 
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
