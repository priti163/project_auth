// src/utils/auth.js
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Perform header-based authentication logic here
  
    next();
  };
  