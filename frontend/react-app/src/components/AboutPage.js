import React, { useState, useEffect } from "react";
import '../components/styles/about.css';
import img1 from '../components/background_images/edit1.jpg';
import img2 from '../components/background_images/edit4.jpg';
import axios from 'axios';

const AboutPage = () => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4040/author')
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.error('Error fetching author data:', error);
      });
  }, []);

  return (
    <div className="about">
      {author ? (
        <div className="author-info">
          <h2>{author.Imie} {author.Nazwisko}</h2>
          <p className="bio">{author.Biografia}</p>
        </div>
      ) : (
        <p>Loading author information...</p>
      )}
      <div className="image-container">
        <img src={img1} alt="about-image1" />
        <img src={img2} alt="about-image2" />
      </div>
    </div>
  );
};

export default AboutPage;
