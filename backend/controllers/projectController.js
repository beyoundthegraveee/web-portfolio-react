const db = require('../config/db.js');
const Project = db.projekt;

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    if (!projects) {
      return res.status(404).json({ message: 'Projects not found' });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) =>{
    const { id } = req.params;
    try{
        const project = await Project.findOne({ where: { ID: id } });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
          }
        res.json(project);
    }catch (error) {
        res.status(500).json({ error: error.message });
      }
};

module.exports = {
    getProjects,
    getProjectById
};