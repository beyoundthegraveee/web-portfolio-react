import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/new-review.css';
import './styles/modal.css';
import Modal from 'react-modal';

const AddReviewPage = () => {
  const [Ocena_wymagan, setOcenaWymagan] = useState('');
  const [Ocena_czasu, setOcenaCzasu] = useState('');
  const [Wrazenie, setWrazenie] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, clientId } = location.state || {};   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4040/review', {
        Projekt_ID : projectId,
        Klients_ID : clientId,
        Ocena_wymagan,
        Ocena_czasu,
        Wrazenie
      });

      if (response.status === 201) {
        setIsCreateModalOpen(true);
        console.log('Review added successfully!');
      }
    } catch (error) {
      setStatusMessage('Error adding review');
      console.error('Error adding review:', error);
    }
  };

  const closeCreateModal = () => {
    navigate('/portfolio');
    setIsCreateModalOpen(false);
    setOcenaWymagan('');
    setOcenaCzasu('');
    setWrazenie('');
  };

  return (
    <div className="wrapper">
      <div className="add-review-container">
        <h2>Add Project Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ocena-wymagan">Requirements Rating:</label>
            <input
              id="ocena-wymagan"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={Ocena_wymagan}
              onChange={(e) => setOcenaWymagan(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ocena-czasu">Time Rating:</label>
            <input
              id="ocena-czasu"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={Ocena_czasu}
              onChange={(e) => setOcenaCzasu(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wrazenie">Impression:</label>
            <textarea
              id="wrazenie"
              value={Wrazenie}
              onChange={(e) => setWrazenie(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Review
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          ariaHideApp={false}
          contentLabel="Review Created"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Review Added Successfully!</h2>
          <button onClick={closeCreateModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddReviewPage;
