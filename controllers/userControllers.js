import User from "../models/userModels.js";
import createToken from "../utils/utils.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mail from "../service/mail.js";
dotenv.config();
const register = async (req, res) => {
  try {
    const username = req.body.username.trim().toLowerCase();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    const checkUsername = await User.findOne({ where: { username } });
    if (checkUsername) {
      return res.status(409).json({ message: "This username already exists." });
    }

    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(409).json({ message: "This email already exists." });
    }

    const user = await User.create({ username, email, password });

    const sendMessage = {
      ...mail.mailOptions,
      to: email,
      subject: "Welcome",
      text: "Welcome to your email address",
    };

    mail.transporter.sendMail(sendMessage, (error, info) => {
      if (error) {
        console.error(error, "mail error");
      }
      console.log("Message sent: %s", info.messageId);
    });

    return res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const hashPassword = User.hashPassword(password);

    if (hashPassword !== user.getDataValue("password")) {
      return res.status(401).json({ message: "False password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = createToken(payload);
    console.log("Отправка токена:", token);
    return res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

const changeUserName = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User don't authintacate" });
    }
    const { newName } = req.body.newName.trim().toLowerCase();
    const { password } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashPassword = User.hashPassword(password);

    if (hashPassword !== user.getDataValue("password")) {
      return res.status(401).json({ message: "False password" });
    }
    const existingUser = await User.findOne({ where: { username: newName } });

    if (existingUser) {
      return res.status(409).json({ message: "This username already exists" });
    }

    await user.update({ username: newName });

    return res.json({ message: "Username change succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error server" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    }

    const verify_code = Math.floor(100000 + Math.random() * 900000).toString();

    user.verify_code = verify_code;
    await user.save();

    const sendMessage = {
      ...mail.mailOptions,
      to: email,
      subject: "Password Recovery",
      text: `Your verification code: ${verify_code}`,
    };
    mail.transporter.sendMail(sendMessage, (error, info) => {
      if (error) {
        console.error(error, "mail error");
      }
      console.log("Message sent: %s", info.messageId);
    });
    return res.json({ message: "Successfully me send message to your mail" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, verify_code, password } = req.body;

    const user = await User.findOne({ where: { email, verify_code } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or verification code" });
    }

    const hashPassword = User.hashPassword(password);

    await User.update(
      { password: hashPassword, verify_code: null },
      { where: { email, verify_code } }
    );

    return res.json({ message: "Password successfully changed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const forgotEmail = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this username not found" });
    }

    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.status(409).json({ message: "This email already exists" });
    }

    const hashPassword = User.hashPassword(password);

    if (hashPassword !== user.getDataValue("password")) {
      return res.status(401).json({ message: "False password" });
    }

    const verify_code = Math.floor(100000 + Math.random() * 900000).toString();
    user.verify_code = verify_code;
    await user.save();

    const sendMessage = {
      ...mail.mailOptions,
      to: email,
      subject: "Password Recovery",
      text: `Your verification code: ${verify_code}`,
    };

    await mail.transporter.sendMail(sendMessage);
    console.log("Message sent: %s", sendMessage.to);

    return res.json("Successfully send message to email");
  } catch (err) {
    console.error("Internal server error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

const changeEmail = async (req, res) => {
  try {
    const { username, email, password, verify_code } = req.body;

    const user = await User.findOne({ where: { username, verify_code } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this username not found" });
    }

    const existingEmail = await User.findOne({ where: { email: email } });

    if (existingEmail) {
      return res.status(409).json({ message: "This email already exists" });
    }

    const hashPassword = User.hashPassword(password);
    if (hashPassword !== user.getDataValue("password")) {
      return res.status(401).json({ message: "False password" });
    }

    await User.update(
      { email: email, verify_code: null },
      { where: { username } }
    );

    return res.redirect("/login");
  } catch (error) {
    console.error("Internal server error:", error);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};


const profile = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token || token === "null") {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  }
  const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decryptedData.id);
  if (!user) {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  } else {
    res.render("profile");
    req.user = decryptedData;
  }
};

const quizz = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token || token === "null") {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  }
  const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decryptedData.id);
  if (!user) {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  } else {
    res.redirect("/web-quizz");
    req.user = decryptedData;
  }
};


const username = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token || token === "null") {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  }
  const decryptedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findByPk(decryptedData.id);
  if (!user) {
    res.status(401).json({ message: "Unathorized" });
    return setTimeout(() => {
      res.redirect("/login");
    }, 2000);
  } else {
    res.render("userProfile");
    req.user = decryptedData;
  }
};


export default {
  register,
  login,
  changeUserName,
  forgotPassword,
  changePassword,
  forgotEmail,
  changeEmail,
  profile,
  quizz,
  username
};
