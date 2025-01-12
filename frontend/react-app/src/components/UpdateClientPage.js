import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/update-project.css';
import './styles/modal.css';
import Modal from 'react-modal';

const UpdateClientPage = () => {
  const { id } = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Imie: '',
    Nazwisko: '',
    Kontakt: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4040/client/${id}`)
      .then((response) => {
        setFormData({
          Imie: response.data.Imie,
          Nazwisko: response.data.Nazwisko,
          Kontakt: response.data.Kontakt,
        });
      })
      .catch((error) => {
        console.error('Error fetching client details:', error);
      });
  }, [id]);

  const validateForm = () => {
    const { Imie, Nazwisko } = formData;

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

    setStatusMessage('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    navigate(`/work/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.put(`http://localhost:4040/client/${id}`, formData);
      setIsUpdateModalOpen(true);
    } catch (error) {
      setStatusMessage('Error updating client');
      console.error('Error updating client:', error);
    }
  };

  return (
    <div className="update">
      <div className="update-project-container">
        <h2>Update Client</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            First Name:
            <input
              type="text"
              name="Imie"
              value={formData.Imie}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Last Name:
            <input
              type="text"
              name="Nazwisko"
              value={formData.Nazwisko}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Email:
            <input
              type="text"
              name="Kontakt"
              value={formData.Kontakt}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          <button type="submit" className="save-button">Save Changes</button>
        </form>
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          ariaHideApp={false}
          contentLabel="Client Updated"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Client Updated Successfully!</h2>
          <button onClick={closeUpdateModal} className="modal-close-button">Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateClientPage;
