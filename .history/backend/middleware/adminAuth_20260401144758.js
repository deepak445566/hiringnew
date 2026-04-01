// middleware/adminAuth.js
import jwt from "jsonwebtoken";

export const adminProtect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") throw new Error();

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};