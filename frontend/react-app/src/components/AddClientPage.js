import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/new-client.css';
import './styles/modal.css';
import Modal from 'react-modal';

const AddClientPage = () => {
  const [clientId, setClientId] = useState(null);
  const [Imie, setImie] = useState('');
  const [Nazwisko, setNazwisko] = useState('');
  const [Kontakt, setKontakt] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    try {
      const response = await axios.post('http://localhost:4040/client', {
        Imie,
        Nazwisko,
        Kontakt
      });

      if (response.status === 201) {
        const createdClientId = response.data.client.id;
        setClientId(createdClientId);
        setIsCreateModalOpen(true);
        console.log('Client added successfully!');
      }
    } catch (error) {
      setStatusMessage('Error adding client');
      console.error('Error adding client:', error);
    }
  };

  const validateForm = () => {
    if (Imie.length > 40 || Nazwisko.length > 40) {
      setStatusMessage('Name and Last Name cannot be longer than 40 characters.');
      return false;
    }
    if (/\s/.test(Imie) || /\s/.test(Nazwisko)) {
      setStatusMessage('Name and Last Name cannot contain spaces.');
      return false;
    }
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(Imie) || !nameRegex.test(Nazwisko)) {
      setStatusMessage('Name and Last Name can only contain letters.');
      return false;
    }

    return true;
  };

  const closeCreateModal = () => {
    if (!clientId) {
      setStatusMessage('Error: Client ID not set.');
      return;
    }
    setIsCreateModalOpen(false);
    navigate('/add-review', {
      state: { projectId, clientId},
    });
    setImie('');
    setNazwisko('');
    setKontakt('');
  };

  return (
    <div className="wrapper">
      <div className="add-client-container">
        <h2>Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imie">First Name:</label>
            <input
              id="imie"
              type="text"
              value={Imie}
              onChange={(e) => setImie(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nazwisko">Last Name:</label>
            <input
              id="nazwisko"
              type="text"
              value={Nazwisko}
              onChange={(e) => setNazwisko(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="kontakt">Email:</label>
            <input
              id="kontakt"
              type="text"
              value={Kontakt}
              onChange={(e) => setKontakt(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Client
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}

        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          ariaHideApp={false}
          contentLabel="Client Created"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Client Added Successfully!</h2>
          <button onClick={closeCreateModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddClientPage;
