const express = require('express');
const router = express.Router();
const { getReviewById, getReviews, addNewReview, updateReviewById} = require('../controllers/reviewController');

router.get('/', getReviews);

router.get('/:id', getReviewById);

router.post('/', addNewReview);

router.put('/:projectId/:clientId', updateReviewById);

module.exports = router;