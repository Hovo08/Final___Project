import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.example.com", // Replace with your SMTP server address
  port: 587, // Common SMTP port; use 465 for secure connections
  secure: false, // Set to true if using port 465
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


  const mailOptions = {
    from: process.env.MAIL_FROM,
  };


 
export default {transporter,mailOptions};


