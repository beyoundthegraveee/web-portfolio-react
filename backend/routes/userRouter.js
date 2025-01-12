const express = require('express');
const router = express.Router();
const { addNewUser, loginUser} = require('../controllers/userController');

router.post('/register', addNewUser);

router.post('/login', loginUser);

module.exports = router;