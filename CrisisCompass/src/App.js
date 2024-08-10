import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header>
        <h1>CrisisCompass</h1>
        <input className="search-bar" type="text" placeholder="Search through the website..." />
      </header>
      
      <div className="slider">
        <p>Recent Disaster Events: Floods in Country X | Earthquake in Region Y | Wildfires in Area Z</p>
      </div>
      
      <div className="card-container">
        <div className="card learn">
          <h2>Learn</h2>
          <p>Find educational resources and articles.</p>
        </div>
        <div className="card prepare">
          <h2>Prepare</h2>
          <p>Get tips and guides on how to prepare for emergencies.</p>
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
        <button className="chat-button">Chat with our bot 🎧</button>
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
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

