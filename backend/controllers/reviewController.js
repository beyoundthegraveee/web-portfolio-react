const db = require('../config/db.js');
const Recenzja = db.recenzja;
const Klients = db.klients;
const Project = db.projekt;

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
        client: review.Klient,
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const addNewReview = async (req, res) => {
  const { Projekt_ID, Klients_ID, Ocena_wymagan, Ocena_czasu, Wrazenie } = req.body;

  try {
    const project = await Project.findByPk(Projekt_ID);
    const client = await Klients.findByPk(Klients_ID);

    if (!project || !client) {
      return res.status(404).json({ message: 'Project or client not found' });
    }
    const newReview = await Recenzja.create({
      Projekt_ID,
      Klients_ID,
      Ocena_wymagan,
      Ocena_czasu,
      Wrazenie
    });

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReviewById = async (req, res) => {
  const { projectId, clientId } = req.params;
  const { Ocena_wymagan, Ocena_czasu, Wrazenie } = req.body;

  try {
    const review = await Recenzja.findOne({
      where: {
        Projekt_ID: projectId,
        Klients_ID: clientId,
      },
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.update({
      Ocena_wymagan,
      Ocena_czasu,
      Wrazenie,
    });

    return res.status(200).json({
      message: 'Review updated successfully!',
      review,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({ message: 'Error updating review' });
  }
};


module.exports = {
  getReviews,
  getReviewById,
  addNewReview,
  updateReviewById,
};