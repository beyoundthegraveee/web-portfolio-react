import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './components/styles/menu.css';
import { RoleProvider } from '../src/components/RoleContext';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import ContactPage from './components/ContactPage';
import WorkPage from './components/WorkPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UpdateProjectPage from './components/UpdateProjectPage';
import UpdateReviewPage from './components/UpdateReviewPage';
import UpdateClientPage from './components/UpdateClientPage';
import AddNewProjectPage from './components/AddNewProjectPage';
import AddClientPage from './components/AddClientPage';
import AddReviewPage from './components/AddReviewPage';
import NotFound from './components/NotFound';


const App = () => {
  return (
    <RoleProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work/:id" element={<WorkPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/update-project/:id" element={<UpdateProjectPage/>}/>
          <Route path="/update-review/:id/:clientId" element={<UpdateReviewPage/>}/>
          <Route path="/update-client/:id" element={<UpdateClientPage/>}/>
          <Route path="/add-project" element={<AddNewProjectPage/>}/>
          <Route path="/add-client" element={<AddClientPage/>}/>
          <Route path="/add-review" element={<AddReviewPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
};

export default App;
