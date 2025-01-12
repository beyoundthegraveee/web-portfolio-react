import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/login.css';
import './styles/modal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRole } from './RoleContext';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
        Login: login,
        Password: password,
      };
    try {
      const response = await axios.post('http://localhost:4040/users/login', User);
      if (response.status === 200) {
        const user = response.data.user;
        Cookies.set('user', JSON.stringify(user), { expires: 1 });
        setRole(user.role);
        setIsModalOpen(true);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const closeModal = () => {
    handleButtonClick();
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    navigate(`/portfolio`);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Logged in Successful"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Login Successful!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default LoginPage;
