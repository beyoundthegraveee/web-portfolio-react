import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosMail } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { SiFiverr } from "react-icons/si";
import '../components/styles/contact.css';

const ContactPage = () => {
  const [contactLinks, setContactLinks] = useState({ instagram: '', fiverr: '' });

  useEffect(() => {
    axios.get('http://localhost:4040/author')
      .then((response) => {
        const { LinkInstagram, LinkFiverr } = response.data;
        setContactLinks({ instagram: LinkInstagram, fiverr: LinkFiverr });
      })
      .catch((error) => {
        console.error('Error fetching contact links:', error);
      });
  }, []);

  return (
    <div className="contact">
      <h1>Get in touch</h1>
      <div className="icons">
        <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="icon instagram">
          <FaInstagramSquare size={80} />
        </a>
        <a href={contactLinks.fiverr} target="_blank" rel="noopener noreferrer" className="icon fiverr">
          <SiFiverr size={80} />
        </a>
        <a href="mailto:example@example.com" className="icon email">
          <IoIosMail size={80} />
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
