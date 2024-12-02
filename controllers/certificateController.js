import mail from "../service/mail.js";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import ejs from "ejs"; 
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const questions = [
  {
    question: "1. Which tag is used to create a header in HTML?",
    options: ["<head>", "<h1>", "<header>", "<title>"],
    answer: "<h1>",
  },
  {
    question:
      "2. Which attribute specifies the path to the image in the <img> tag?",
    options: ["src", "href", "alt", "path"],
    answer: "src",
  },
  {
    question: "3. Which tag is used to create a list?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<ul>",
  },
  {
    question: "4. Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "5. Which tag is used to insert a video?",
    options: ["<video>", "<media>", "<movie>", "<film>"],
    answer: "<video>",
  },
  {
    question: "6. Which tag is used to create a table?",
    options: ["<table>", "<tab>", "<tr>", "<td>"],
    answer: "<table>",
  },
  {
    question: "7. Which attribute makes text bold?",
    options: ["strong", "bold", "b", "header"],
    answer: "strong",
  },
  {
    question: "8. Which tag is used to create forms?",
    options: ["<form>", "<input>", "<textarea>", "<field>"],
    answer: "<form>",
  },
  {
    question: "9. Which tag is used to create a paragraph?",
    options: ["<p>", "<paragraph>", "<text>", "<div>"],
    answer: "<p>",
  },
  {
    question: "10. Which tag is used to create a section of a page?",
    options: ["<section>", "<div>", "<block>", "<area>"],
    answer: "<section>",
  },
];

const quizz = async (req, res) => {
  let isIncorrect = false;
  for (let i = 0; i < questions.length; i++) {
    const answer = req.body[`answers[${i}]`];
    if (answer !== questions[i].answer) {
      isIncorrect = true;
      break;
    }
  }

  if (isIncorrect) {
    return res.send("Incorrect answer. The quiz is stopped.");
  }
  res.render("certificate");
};


const sendEmailCertificate = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decryptedData; // Get user ID from decrypted token

    // Optional: Validate request body
    const { fname, lname } = req.body;
    if (!fname || !lname) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const templatePath = path.join(__dirname, "../views/email/certificate.ejs");
    const html = await ejs.renderFile(templatePath, { fname, lname });

    const sendMessage = {
      ...mail.mailOptions,
      to: user.email,
      subject: "Your Certificate of Completion",
      html,
    };

    await mail.transporter.sendMail(sendMessage);
    console.log("Message sent to: %s", user.email);

    return res.status(200).json({ message: "Certificate sent successfully!" });
  } catch (error) {
    console.error("Token verification error:", error.message); // Log token verification errors
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default { questions, quizz,sendEmailCertificate };
