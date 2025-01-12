import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import '../components/styles/work.css';
import '../components/styles/modal.css';

const WorkPage = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleUpdateProject = () => {
    navigate(`/update-project/${id}`);
  };

  const handleUpdateClient = () => {
    navigate(`/update-client/${id}`);
  };

  const handleUpdateReview = () => {
    const clientId = clientDetails.ID;
    navigate(`/update-review/${id}/${clientId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4040/projects/${id}`);
      setProjectDetails(null);
      setReviewDetails(null);
      setClientDetails(null);
      setIsDeleteModalOpen(true);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const closeDeleteModal = () => {
    navigate('/portfolio');
    setIsDeleteModalOpen(false);
  };

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

      {reviewDetails ? (
        <div className="review-container">
          <h3>Review</h3>
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

      <button onClick={handleUpdateProject} className="update-button">update project</button>
      <button onClick={handleUpdateClient} className="update-button">update client</button>
      <button onClick={handleUpdateReview} className="update-button">update review</button>
      <button onClick={handleDelete} className="delete-button">delete project</button>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        ariaHideApp={false}
        contentLabel="Project Deleted"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Project Deleted Successfully!</h2>
        <button onClick={closeDeleteModal}>Close</button>
      </Modal>

    </div>


  );
};

export default WorkPage;
