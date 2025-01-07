import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/work.css';

const WorkPage = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/projects/${id}`)
      .then((response) => {
        setProjectDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4040/review/${id}`)
      .then((response) => {
        setReviewDetails(response.data.review);
        setClientDetails(response.data.client);
      })
      .catch((error) => {
        console.error('Error fetching review details:', error);
      });
  }, [id]);

  return (
    <div className="work-page">
      <h1 className="page-title">Project Details</h1>
      {projectDetails ? (
        <div className="project-container">
          <div className="image-container">
          <img
              src={`${process.env.PUBLIC_URL}/project_images/project${id}.jpg`}
              alt={id}
              className="project-image"
            />
          </div>
          <div className="details-container">
            <h2 className="project-title">{projectDetails.Opis}</h2>
            <p><strong>Deadline:</strong> {projectDetails.Termin}</p>
            <p><strong>Status:</strong> {projectDetails.Status_pr}</p>
            <p><strong>Price:</strong> {projectDetails.Cena} PLN</p>
          </div>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}

      <h3>Review</h3>
      {reviewDetails ? (
        <div className="review-container">
          <p><strong>Requirements Rating:</strong> {reviewDetails.Ocena_wymagan}</p>
          <p><strong>Time Rating:</strong> {reviewDetails.Ocena_czasu}</p>
          <p><strong>Impression:</strong> {reviewDetails.Wrazenie}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}

      {clientDetails ? (
        <div className="client-container">
          <h3>Client Details</h3>
          <p><strong>Name:</strong> {clientDetails.Imie} {clientDetails.Nazwisko}</p>
          <p><strong>Contact:</strong> {clientDetails.Kontakt}</p>
        </div>
      ) : (
        <p>Loading client details...</p>
      )}
    </div>
  );
};

export default WorkPage;
