import React from "react";
import '../components/styles/waves.css';
import './Noise';
import './Waves';

const HomePage = () => {
  return (
    <div className="home">
      <a-waves>
        <svg className="js-svg">
          <path className="js-path" />
        </svg>
      </a-waves>
    </div>
  );

};

export default HomePage;
