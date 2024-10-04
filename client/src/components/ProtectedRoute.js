// src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = localStorage.getItem('token'); // Example: Check if a token exists

//     return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if a token exists

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
