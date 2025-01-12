import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/styles/portfolio.css';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4040/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4040/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/work/${id}`);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddProjectClick = () => {
    navigate('/add-project');
  };

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.Kategoria_ID === selectedCategory)
    : projects;

  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <p>
      Welcome to my portfolio! Here, you will find a collection of my work, including various projects I've worked on.
      </p>
      <div className="categories-container">
        <div className="categories">
          <button onClick={() => handleCategoryChange(null)}>All</button>
          {categories.map((category) => (
            <button
              key={category.ID}
              onClick={() => handleCategoryChange(category.ID)}
            >
              {category.Opis}
            </button>
          ))}
        </div>
        <button className="add-category-button" onClick={handleAddProjectClick}>+New Project</button>
      </div>
      <div className="projects">
      {filteredProjects.length === 0 ?(
          <p>No projects available for this category yet.</p>
        ) : !selectedCategory && projects.length === 0 ? (
          <p>No projects in the portfolio yet.</p>
        ) : (
          filteredProjects.map((project) => (
          <div
            key={project.ID}
            className="project-card"
            onClick={() => handleCardClick(project.ID)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/project_images/project${project.ID}.jpg`}
              alt={project.ID}
              className="project-image"
            />
            <h2>{project.Opis}</h2>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default PortfolioPage;
