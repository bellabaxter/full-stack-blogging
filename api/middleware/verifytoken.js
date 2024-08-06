import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("Not authenticated!");
  }

  const token = authHeader.split(' ')[1];
  console.log("Received Token:", token); 
  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userInfo = userInfo;
    next();
  });
};

export default verifyToken;