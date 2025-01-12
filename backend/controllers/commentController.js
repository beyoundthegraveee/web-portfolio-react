const db = require('../config/db.js');
const Comments = db.comments;
const Project = db.projekt;

const getComments = async (req, res) => {
    const { id } = req.params;
    try {
      const comments = await Comments.findAll({ where: { Project_ID: id } });
      
      if (!comments || comments.length === 0) {
        return res.status(200).json({
          message: 'No comments found for this project',
          comments: []
        });
      }
      const formattedComments = comments.map(comment => ({
        id: comment.ID,
        content: comment.Content,
        date_added: comment.Date_Added
      }));
      res.json({ comments: formattedComments });
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments from database' });
    }
};

  const addComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const newComment = await Comments.create({
            Content: content,
            Project_ID: id
        });

        res.status(201).json({
            message: 'Comment added successfully',
            comment: {
                id: newComment.ID,
                content: newComment.Content,
                date_added: newComment.Date_Added,
            },
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment to database' });
    }
};

module.exports = {
    getComments,
    addComment,
};
