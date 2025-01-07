const db = require('../config/db.js');
const Author = db.autor;

const getAuthorInfo = async (req, res) => {
  try {
    const author = await Author.findOne();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAuthorInfo,
};