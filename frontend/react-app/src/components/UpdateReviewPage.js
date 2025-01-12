import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/update-project.css';
import './styles/modal.css';
import Modal from 'react-modal';

const UpdateReviewPage = () => {
  const { id, clientId } = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Ocena_wymagan: '',
    Ocena_czasu: '',
    Wrazenie: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:4040/review/${id}`)
      .then((response) => {
        const review = response.data.review;
        setFormData({
          Ocena_wymagan: review.Ocena_wymagan,
          Ocena_czasu: review.Ocena_czasu,
          Wrazenie: review.Wrazenie,
        });
      })
      .catch((error) => {
        console.error('Error fetching review details:', error);
        setStatusMessage('Failed to load review details.');
      });
  }, [id]);

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
    try {
      await axios.put(`http://localhost:4040/review/${id}/${clientId}`, formData);
      setIsUpdateModalOpen(true);
    } catch (error) {
      setStatusMessage('Error updating review');
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="update">
      <div className="update-project-container">
        <h2>Update Review</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Requirement Rating (0-5):
            <input
              type="number"
              name="Ocena_wymagan"
              value={formData.Ocena_wymagan}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.01"
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Time Rating (0-5):
            <input
              type="number"
              name="Ocena_czasu"
              value={formData.Ocena_czasu}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="0.01"
            />
          </label>
          </div>
          <div className="form-group">
          <label>
            Impression (optional, max 500 characters):
            <textarea
              name="Wrazenie"
              value={formData.Wrazenie}
              onChange={handleChange}
              rows="5"
              maxLength="500"
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
          contentLabel="Review Updated"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Review Updated Successfully!</h2>
          <button onClick={closeUpdateModal} className="modal-close-button">Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateReviewPage;
