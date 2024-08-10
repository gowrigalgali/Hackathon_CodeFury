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
          <p>In moments of crisis, the SOS button is there to provide immediate assistance and alert those who can help. For more personal communication or inquiries, the Reach Out button allows you to send a custom message, offering a way to connect without urgency.</p>
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
