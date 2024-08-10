import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import NewsSlider from './newsslider';
import RegisterLogin from './RegisterLogin';
import VolunteerHelp from './components/VolunteerHelp';
import LocationSMS from './sos';
import Chatbot from './chatbot'; 
import EarthquakeDetails from './earthquake'; 
import HurricaneDetails from './hurricane';
import FloodDetails from './flood'; 
import TornadoDetails from './tornado'; 


function Home() {
  const navigate = useNavigate();

  const handleSOSClick = () => {
    navigate('/sendsos');
  };

  const handleLearnClick = () => {
    navigate('/chatbot');
  };

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
          <button 
            type="button" 
            className="submit-button"
            onClick={handleLearnClick}
          >
            Click here to learn with our Chat Bot 🎧
          </button>
        </div>
        <div className="card prepare">
          <div>
            <h2>Prepare</h2>
            <p>Prepare yourself for emergencies and various natural disasters.</p>
            <div className="preparation-list">
              <ul>
                <li>
                  <Link to="/earthquake">
                    <h3>Earthquake</h3>
                  </Link>
                </li>
                <li>
                  <Link to="/hurricane">
                    <h3>Hurricane</h3>
                  </Link>
                </li>
                <li>
                  <Link to="/flood">
                    <h3>Floods</h3>
                  </Link>
                </li>
                <li>
                  <Link to="/tornado">
                    <h3>Tornado</h3>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card act">
          <h2>Act</h2>
          <p>Take action to help those affected by disasters.</p>
          <button 
            onClick={handleSOSClick} 
            className="sos-button"
          >
            SOS
          </button>
        </div>
      </div>

      <VolunteerHelp /> 

      <div className="bottom-buttons">
        <Link to="/register" className="link-button">
          <button className="volunteer-button">Join as a Volunteer</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterLogin />} />
        <Route path="/sendsos" element={<LocationSMS />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/earthquake" element={<EarthquakeDetails />} /> {/* Corrected component usage */}
        <Route path="/hurricane" element={<HurricaneDetails />} />
        <Route path="/flood" element={<FloodDetails />} /> 
        <Route path="/tornado" element={<TornadoDetails />} /> 
      </Routes>
    </Router>
  );
}

export default App;
