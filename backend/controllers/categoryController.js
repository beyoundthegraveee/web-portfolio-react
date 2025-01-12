const db = require('../config/db.js');
const Kategoria = db.kategoria;

const getCategories = async (req, res) => {
  try {
    const categories = await Kategoria.findAll();
    if (!categories) {
      return res.status(404).json({ message: 'Projects not found' });
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getCategories
}