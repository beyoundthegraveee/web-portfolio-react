import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/new-project.css';
import './styles/modal.css';
import Modal from 'react-modal';

const AddNewProjectPage = () => {
  const [projectId, setProjectId] = useState(null);
  const [Opis, setOpis] = useState('');
  const [Termin, setTermin] = useState('');
  const [Status_pr, setStatusPr] = useState('');
  const [Cena, setCena] = useState('');
  const [Kategoria_ID, setKategoriaId] = useState('');
  const [categories, setCategories] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4040/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCenaChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setCena(0); 
    } else if (value > 100000) {
      setCena(100000);
    } else {
      setCena(value);
    }
  };

  const handleTerminChange = (e) => {
    const value = e.target.value;
    const currentYear = new Date().getFullYear();
    const selectedYear = new Date(value).getFullYear();

    if (selectedYear < currentYear) {
      setStatusMessage(`Date cannot be earlier than ${currentYear}.`);
    } else {
      setStatusMessage('');
      setTermin(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4040/projects', {
        Opis,
        Termin,
        Status_pr,
        Cena: parseInt(Cena, 10),
        Autor_ID: 1,
        Kategoria_ID: Kategoria_ID ? parseInt(Kategoria_ID, 10) : null,
      });

      if (response.status === 201) {
        const id = response.data.project.ID;
        setProjectId(id);
        setIsCreateModalOpen(true);
        console.log('Project created successfully!');
      }
    } catch (error) {
      setStatusMessage('Error creating project');
      console.error('Error creating project:', error);
    }
  };

  const closeCreateModal = () => {
    navigate('/add-client', { state: { projectId } });
    setIsCreateModalOpen(false);
    setOpis('');
    setTermin('');
    setStatusPr('');
    setCena('');
    setKategoriaId('');
  };

  return (
    <div className='wrapper'>
      <div className="add-project-container">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="opis">Nazwa:</label>
            <textarea
              id="opis"
              value={Opis}
              onChange={(e) => setOpis(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="termin">Termin:</label>
            <input
              id="termin"
              type="date"
              value={Termin}
              onChange={handleTerminChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status-pr">Status projektu:</label>
            <input
              id="status-pr"
              type="text"
              value={Status_pr}
              onChange={(e) => setStatusPr(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cena">Cena:</label>
            <input
              id="cena"
              type="number"
              value={Cena}
              onChange={handleCenaChange}
              min="0"
              max="100000"
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="kategoria-id">Kategoria:</label>
            <select
              id="kategoria-id"
              value={Kategoria_ID}
              onChange={(e) => setKategoriaId(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.ID} value={category.ID}>
                  {category.Opis}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Create Project
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
        <Modal
          isOpen={isCreateModalOpen}
          onRequestClose={closeCreateModal}
          ariaHideApp={false}
          contentLabel="Project Created"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Project Created Successfully!</h2>
          <button onClick={closeCreateModal}>Close</button>
        </Modal>
      </div>
    </div>
  );
};

export default AddNewProjectPage;
