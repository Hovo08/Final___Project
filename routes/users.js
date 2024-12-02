import express from "express";
import controller from "../controllers/userControllers.js";
import check from "../middleware/checkToken.js";
import validate from "../middleware/validate.js";
import userSchemaNew from "../schemas/userSchema.js";
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/change-username",(req, res) => {
  res.render("userProfile");
});

router.get("/forgot-password", (req, res) => {
  res.render("forgotPassword");
});

router.get("/change-password", (req, res) => {
  res.render("changePassword");
});

router.get("/forgot-email", (req,res) => {
  res.render("forgotEmail")
})

router.get("/change-email", (req,res) => {
  res.render("changeEmail")
})

router.get("/settings", (req,res) => {
  res.render("settings")
})

router.post("/register", validate(userSchemaNew.register),controller.register);
router.post("/login", validate(userSchemaNew.login), controller.login);
router.get("/profil-get", controller.profile);
router.get("/username-get", controller.username)
router.post("/change-username", check, controller.changeUserName);
router.post("/forgot-password", controller.forgotPassword);
router.post("/change-password", validate(userSchemaNew.changePassword), controller.changePassword); 
router.post("/forgot-email", validate(userSchemaNew.forgotEmail), controller.forgotEmail);
router.post("/change-email", validate(userSchemaNew.changeEmail), controller.changeEmail);
export default router;