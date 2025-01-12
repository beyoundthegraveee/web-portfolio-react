import React, { useEffect } from "react";
import '../components/styles/waves.css';
import './Noise';
import './Waves';

const HomePage = () => {
  useEffect(() => {
    const loadNoiseScript = new Promise((resolve) => {
      const noiseScript = document.createElement('script');
      noiseScript.src = './Noise.js';
      noiseScript.async = true;
      document.body.appendChild(noiseScript);
    });

    loadNoiseScript.then(() => {
      const wavesScript = document.createElement('script');
      wavesScript.src = './Waves.js';
      wavesScript.async = true;
      document.body.appendChild(wavesScript);
    });

    return () => {
      const scripts = document.querySelectorAll('script[src="./Noise.js"], script[src="./Waves.js"]');
      scripts.forEach(script => document.body.removeChild(script));
    };
  }, []);
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
