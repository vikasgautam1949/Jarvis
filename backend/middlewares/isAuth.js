import jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded =await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Assuming the token contains user ID
    next();

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
    
  }
}
export default isAuth;