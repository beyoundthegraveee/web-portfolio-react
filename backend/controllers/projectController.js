const db = require('../config/db.js');
const Project = db.projekt;
const Klients = db.klients;
const Recenzja = db.recenzja;
const Comments = db.comments;

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

const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findOne({ where: { ID: id } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const comments = await Comments.findAll({ where: { Project_ID: id } });
    if (comments) {
      await Comments.destroy({ where: { Project_ID: id } });
    }

    const review = await Recenzja.findOne({ where: { Projekt_ID: id } });
    if (review) {
      await review.destroy();
      await Klients.destroy({ where: { ID: review.Klients_ID } });
    }
    await project.destroy();
    const updatedProjects = await Project.findAll();
    return res.status(200).json({ message: 'Project deleted successfully', projects: updatedProjects });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addNewProject = async (req, res) =>{
  const { Opis, Termin, Status_pr, Cena, Autor_ID, Kategoria_ID } = req.body;

  try {
    const newProject = await Project.create({
      Opis,
      Termin,
      Status_pr,
      Cena,
      Autor_ID,
      Kategoria_ID
    });
    res.status(201).json({
      message: 'Project added successfully',
      project: {
        id: newProject.ID,
        ...newProject.dataValues
      }
    });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Error adding project to database' });
  }
};

const updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { Opis, Termin, Status_pr, Cena } = req.body;

  try {
    const project = await Project.findOne({ where: { ID: id } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.update({ Opis, Termin, Status_pr, Cena });

    res.status(200).json({
      message: 'Project updated successfully',
      project: {
        id: project.ID,
        ...project.dataValues
      }
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
};

module.exports = {
    getProjects,
    getProjectById,
    deleteProjectById,
    addNewProject,
    updateProjectById
};