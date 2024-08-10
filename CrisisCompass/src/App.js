import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import NewsSlider from './newsslider';
import VolunteerHelp from './components/VolunteerHelp';
import axios from 'axios';

function Home() {
  const [isSending, setIsSending] = useState(false);
  const [sosMessage, setSosMessage] = useState('');
  const [reachOutMessage, setReachOutMessage] = useState('');
  const [reachOutStatus, setReachOutStatus] = useState('');

  const sendLocationSMS = async () => {
    try {
      setIsSending(true);
      setSosMessage('Sending SOS message...');
      const response = await axios.post('http://localhost:5000/api/send-sms', {
        from: '447441421037',  // Your sender number
        to: ['919611760575'],  // Receiver number
        body: 'SOS: Send help to my location!',
      });
      if (response.status === 200) {
        setSosMessage('Failed to send SOS message.');
      } else {
        setSosMessage('SOS message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
      setSosMessage('Error sending SOS message.');
    } finally {
      setIsSending(false);
    }
  };

  const sendReachOutMessage = async () => {
    try {
      setReachOutStatus('Sending your message...');
      const response = await axios.post('http://localhost:5000/api/send-sms', {
        from: '447441421037',  // Your sender number
        to: ['919611760575'],  // Receiver number
        body: reachOutMessage,
      });
      if (response.status === 200) {
        setReachOutStatus('Failed to send your message.');
      } else {
        setReachOutStatus('Message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      setReachOutStatus('Error sending your message.');
    }
  };

  const handleSOSClick = () => {
    if (isSending) return; // Prevent multiple clicks
    sendLocationSMS();
  };

  const handleReachOutClick = () => {
    if (reachOutMessage.trim() === '') {
      setReachOutStatus('Please enter a message.');
      return;
    }
    sendReachOutMessage();
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

          {/* Reach Out Section */}
          <textarea
            className="reach-out-textbox"
            placeholder="Type your message..."
            value={reachOutMessage}
            onChange={(e) => setReachOutMessage(e.target.value)}
          />
          <button
            onClick={handleReachOutClick}
            className="reach-out-button"
          >
            Reach Out
          </button>
          {reachOutStatus && <p className="reach-out-status">{reachOutStatus}</p>}
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
      </Routes>
    </Router>
  );
}

export default App;
