import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/register.css';
import './styles/modal.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateData()) {
        return;
    }

    const newUser = {
      Login: login,
      Email: email,
      Password: password,
    };
    try {
      const response = await fetch('http://localhost:4040/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
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

  const validateData = () => {
    const loginRegex = /^[a-zA-Z0-9]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (login.length < 6 || login.length > 20) {
      setError('Login must have at least 6 characters and less than 20.');
      return false;
    }
    if (!loginRegex.test(login)) {
      setError('Login can only contain letters and numbers.');
      return false;
    }
    if (/\s/.test(login) || /\s/.test(password) || /\s/.test(email)) {
      setError('Login, password, and email cannot contain spaces.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    if (password.length < 8 || password.length > 25) {
      setError('Password must be greater than 8 and less than 25 characters.');
      return false;
    }
    return true;
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Registration Successful"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Registration Successful!</h2>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default RegisterPage;
