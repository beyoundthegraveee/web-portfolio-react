const express = require('express');
const router = express.Router();
const { addNewClient, getClientById, updateClientById } = require('../controllers/clientController.js');

router.get('/:id', getClientById);

router.post('/', addNewClient);

router.put('/:id', updateClientById );

module.exports = router;