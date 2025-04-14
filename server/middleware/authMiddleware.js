import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

export const authorize = (authorizedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Inject user info into the request object
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

      // Check if the user's role is authorized
      if (authorizedRoles && !authorizedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      res.status(400).json({ message: 'Invalid token' });
    }
  };
};