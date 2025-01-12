import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/update-project.css';
import './styles/modal.css';
import Modal from 'react-modal';

const UpdateProjectPage = () => {
  const { id } = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Opis: '',
    Termin: '',
    Status_pr: '',
    Cena: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4040/projects/${id}`)
      .then((response) => {
        setFormData({
          Opis: response.data.Opis,
          Termin: response.data.Termin,
          Status_pr: response.data.Status_pr,
          Cena: response.data.Cena,
        });
      })
      .catch((error) => {
        console.error('Error fetching project details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCenaChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setFormData((prevData) => ({ ...prevData, Cena: 0 }));
    } else if (value > 100000) {
      setFormData((prevData) => ({ ...prevData, Cena: 100000 }));
    } else {
      setFormData((prevData) => ({ ...prevData, Cena: value }));
    }
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    navigate(`/work/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Cena) {
      setStatusMessage('Please fill all fields correctly.');
      return;
    }

    try {
      await axios.put(`http://localhost:4040/projects/${id}`, formData);
      setIsUpdateModalOpen(true);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className='update'>
      <div className="update-project-container">
        <h2>Update Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label>
            Nazwa:
            <input
              type="text"
              name="Opis"
              value={formData.Opis}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Termin:
            <input
              type="date"
              name="Termin"
              value={formData.Termin}
              onChange={handleChange}
              required
            />
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </label>
          </div>
          <div className="form-group">
          <label>
            Status:
            <input
              type="text"
              name="Status_pr"
              value={formData.Status_pr}
              onChange={handleChange}
              required
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Cena (PLN):
            <input
              type="number"
              name="Cena"
              value={formData.Cena}
              min="0"
              max="100000"
              onChange={handleCenaChange}
              required
            />
          </label>
          </div>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
        <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={closeUpdateModal}
            ariaHideApp={false}
            contentLabel="Project Updated"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <h2>Project Updated Successfully!</h2>
            <button onClick={closeUpdateModal} className="modal-close-button">Close</button>
          </Modal>
      </div>
    </div>
  );
};

export default UpdateProjectPage;
