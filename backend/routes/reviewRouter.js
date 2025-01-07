const express = require('express');
const router = express.Router();
const { getReviewById, getReviews} = require('../controllers/reviewController');

router.get('/', getReviews);

router.get('/:id', getReviewById);

module.exports = router;