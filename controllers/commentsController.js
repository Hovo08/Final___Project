import Comment from "../models/commentModels.js"; 

const postComment = async (req, res) => {
    const { comment,lesson_type, } = req.body;
    const userId = req.user.id; 

    try {
        const newComment = await Comment.create({
            comments: comment,
            UserId: userId, 
            lesson_type:lesson_type,
        });
        return res.status(201).json(newComment);
    } catch (error) {
        console.error('Error while posting comment:', error);
        return res.status(500).json({ error: 'Error posting comment' });
    }
};



export default {
  postComment
  
};