import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NewsSlider from './newsslider';
import RegisterLogin from './RegisterLogin';

function Home() {
  return (
    <div className="App">
      <header>
        <h1>CrisisCompass</h1>
        <input className="search-bar" type="text" placeholder="Search through the website..." />
      </header>
      
      <NewsSlider />
      
      <div className="card-container">
        <div className="card learn">
          <h2>Learn</h2>
          <p>Enhance your knowledge about calamities and disasters</p>
          <button type="submit" className="submit-button">Click here to learn with our Chat Bot 🎧</button>
        </div>
        <div className="card prepare">
          <h2>Prepare</h2>
          <p>Prepare yourself for emergencies.</p>
          <ul>
            <li><a href="#">Earthquake</a></li>
            <li><a href="#">Hurricane</a></li>
            <li><a href="#">Floods</a></li>
            <li><a href="#">Tornado</a></li></ul>
          
        </div>
        <div className="card act">
          <h2>Act</h2>
          <p>Take action to help those affected by disasters.</p>
        </div>
      </div>

      <div className="bottom-buttons">
        <Link to="/register" className="link-button">
          <button className="volunteer-button">Join as a Volunteer</button>
        </Link>
      </div>
    </div>
  );
}

function Register() {
  return (
    <div className="register-page">
      <h1>Register or Login</h1>
      <form className="register-form">
        <label>
          Email:
          <input type="email" placeholder="Your email" />
        </label>
        <label>
          Password:
          <input type="password" placeholder="Your password" />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterLogin />} />
      </Routes>
    </Router>
  );
}

export default App;



