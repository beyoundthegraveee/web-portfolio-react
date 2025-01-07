const express = require('express');
const router = express.Router();
const { getAuthorInfo } = require('../controllers/authorController');
router.get('/', getAuthorInfo);

module.exports = router;