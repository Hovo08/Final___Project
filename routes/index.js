import express from "express";
const router = express.Router(); 

import users from "./users.js"; 
import lesson from "./lesson.js"; 
import quizz from "./certificate.js"; 

router.get("/" , function(req, res) {
    res.render("home");
})

router.use("/", users); 
router.use("/", lesson); 
router.use("/", quizz); 

export default router; 
