// utils.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (payload) => {
  const { id, username, email } = payload;
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default createToken;
