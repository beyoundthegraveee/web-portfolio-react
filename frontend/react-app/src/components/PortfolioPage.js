import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/styles/portfolio.css';
import { useNavigate } from 'react-router-dom';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
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

  const handleCardClick = (id) => {
    navigate(`/work/${id}`);
  };

  return (
    <div className="portfolio">
      <h1>My Portfolio</h1>
      <p>
        Welcome to my portfolio! Here, you will find a collection of my work,
        including various projects I've worked on.
      </p>
      <div className="projects">
        {projects.map((project) => (
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
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
