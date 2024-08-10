import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NewsSlider from './newsslider';
import RegisterLogin from './RegisterLogin';
import VolunteerHelp from './components/VolunteerHelp';
import axios from 'axios';

function Home() {
  const [isSending, setIsSending] = useState(false);
  const [sosMessage, setSosMessage] = useState('');

  const sendLocationSMS = async () => {
    try {
      setIsSending(true);
      setSosMessage('Sending SOS message...');

      const smsPayload = {
        from: '447441421037',
        to: ['919611760575'],
        body: 'SOS message or location data'
      };

      const response = await axios.post('http://localhost:5000/api/send-sms', smsPayload);

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        setSosMessage('Failed to send SOS message.');
      } else {
        setSosMessage('SOS message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      setSosMessage('Error sending SOS message.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSOSClick = () => {
    if (isSending) return; // Prevent multiple clicks
    sendLocationSMS();
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
          <button type="submit" className="submit-button">Click here to learn with our Chat Bot 🎧</button>
        </div>
        <div className="card prepare">
          <h2>Prepare</h2>
          <p>Prepare yourself for emergencies.</p>
          <ul>
            <li><button className="link-button">Earthquake</button></li>
            <li><button className="link-button">Hurricane</button></li>
            <li><button className="link-button">Floods</button></li>
            <li><button className="link-button">Tornado</button></li>
          </ul>
        </div>
        <div className="card act">
          <h2>Act</h2>
          <p>Take action to help those affected by disasters.</p>
          <button 
            onClick={handleSOSClick} 
            className="sos-button"
            disabled={isSending}
          >
            SOS
          </button>
          {sosMessage && <p className="sos-message">{sosMessage}</p>}
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
      </Routes>
    </Router>
  );
}

export default App;
