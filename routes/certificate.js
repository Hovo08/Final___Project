import express from "express";
import certificate from "../controllers/certificateController.js";
import controller from "../controllers/userControllers.js"
const router = express.Router();

router.get("/web-quizz", (req, res) => {
  res.render("webQuizz", { questions: certificate.questions });
});

router.get("/get-quizz", controller.quizz)
router.post("/web-quizz",  certificate.quizz);
router.post("/send-certificate",  certificate.sendEmailCertificate);

export default router;
