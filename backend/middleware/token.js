import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or improperly formatted' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err.message);
    const status = err.name === 'TokenExpiredError' ? 401 : 403;
    res.status(status).json({ message: 'Invalid or expired token' });
  }
};

export { authenticateToken };
