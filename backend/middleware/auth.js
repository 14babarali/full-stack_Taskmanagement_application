// middleware/auth.js
import jwt from 'jsonwebtoken'; // Import jwt using ESM syntax

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  
  if (!token) return res.status(401).send('Access denied.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied.');
  }
  next();
};

export { authMiddleware, isAdmin }; // Use named exports for the middleware functions
