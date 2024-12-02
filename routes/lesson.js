import comment from "../controllers/commentsController.js";
import User from "../models/userModels.js";
import Comment from "../models/commentModels.js";
import router from "./users.js";
import check from "../middleware/checkToken.js";
import ratings from "../controllers/ratingController.js"


router.get("/html-lesson", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { lesson_type: "html-lesson" },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    return res.render("html", { comments: comments || [] });
  } catch (err) {
    console.error("Ошибка при получении комментариев:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/js-lesson", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { lesson_type: "js-lesson" },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    return res.render("javascript", { comments: comments || [] });
  } catch (err) {
    console.error("Ошибка при получении комментариев:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/css-lesson", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { lesson_type: "css-lesson" },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    return res.render("css", { comments: comments || [] });
  } catch (err) {
    console.error("Ошибка при получении комментариев:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/node-lesson", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { lesson_type: "node-lesson" },
      include: {
        model: User,
        attributes: ["username"],
      },
    });

    return res.render("node", { comments: comments || [] });
  } catch (err) {
    console.error("Ошибка при получении комментариев:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/rate", check, ratings.postRating);

router.post("/html-lesson", check, comment.postComment);
router.post("/js-lesson", check, comment.postComment);
router.post("/css-lesson", check, comment.postComment);
router.post("/node-lesson", check, comment.postComment);
export default router;
