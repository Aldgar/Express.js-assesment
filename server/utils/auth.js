import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; 

export const verifyToken = (token) => {
  if (!token) {
    throw new Error('Access denied. No token provided.');
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);

   
    return { id: decoded.id, email: decoded.email, role: decoded.role };
  } catch (err) {
    console.error(err); 
    throw new Error('Invalid token');
  }
};