import jwt from 'jsonwebtoken';

const authMiddleware = (allowedRoles = []) => (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(403).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    // If specific roles are allowed, check if the user has one of those roles
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
