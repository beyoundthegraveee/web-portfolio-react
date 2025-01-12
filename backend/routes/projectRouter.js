const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, deleteProjectById, addNewProject, updateProjectById} = require('../controllers/projectController');

router.get('/', getProjects);

router.get('/:id', getProjectById);

router.delete('/:id', deleteProjectById);

router.post('/', addNewProject);

router.put('/:id', updateProjectById);

module.exports = router;