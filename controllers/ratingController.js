import Rating from "../models/ratingModels.js";

const postRating = async (req, res) => {
    
  const { rating, lesson_type } = req.body;
  const userId = req.user.id;

  try {
    const existingRating = await Rating.findOne({
      where: {
        UserId: userId,
        lesson_type: lesson_type,
      },
    });

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "Вы уже оставили оценку для этого урока." });
    }

    const newRating = await Rating.create({
      rating,
      lesson_type,
      UserId: userId,
    });
    return res.status(201).json(newRating);
  } catch (error) {
    console.error("Ошибка при добавлении оценки:", error);
    return res.status(500).json({ error: "Ошибка при добавлении оценки" });
  }
};

export default {
  postRating,
};
