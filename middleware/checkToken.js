import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkToken = async (req, res, next) => {
  const token =
    req.headers.authorization 
     if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decryptedData.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decryptedData;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Log error details
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default checkToken;
