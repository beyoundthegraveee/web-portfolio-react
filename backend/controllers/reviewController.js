const db = require('../config/db.js');
const Recenzja = db.recenzja;
const Klients = db.klients;



const getReviews = async (req, res) => {
  try {
    const reviews = await Recenzja.findAll();
    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found' });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewById = async (req, res) => {
    const projectId = req.params.id;
  
    try {
      const review = await Recenzja.findOne({
        where: {
          Projekt_ID: projectId
        },
        include: [{
          model: Klients,
          attributes: ['ID', 'Imie', 'Nazwisko', 'Kontakt'],
        }],
      });
  
      if (!review) {
        return res.status(404).json({ message: 'No review found for this project' });
      }
  
      res.json({
        review: {
            Ocena_wymagan: review.Ocena_wymagan,
            Ocena_czasu: review.Ocena_czasu,
            Wrazenie: review.Wrazenie,
        },
        client: review.Klient, // Информация о клиенте
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getReviews,
    getReviewById
  };