import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Add imports for Router, Route, Routes, and Link
import './App.css';
import { useNavigate } from 'react-router-dom';
import NewsSlider from './newsslider'; // Import NewsSlider component
import RegisterLogin from './RegisterLogin'; // Import RegisterLogin component
import SendSOS from './sos'; // Import SendSOS component

function Home() {
  const navigate = useNavigate();

  const handleSOSClick = () => {
    navigate('/sendsos');
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
            <li><a href="#">Earthquake</a></li>
            <li><a href="#">Hurricane</a></li>
            <li><a href="#">Floods</a></li>
            <li><a href="#">Tornado</a></li>
          </ul>
        </div>
        <div className="card act">
          <h2>Act</h2>
          <p>Take action to help those affected by disasters.</p>
          <button 
            onClick={handleSOSClick} 
            className="sos-button">
            SOS
          </button>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterLogin />} />
        <Route path="/sendsos" element={<SendSOS />} />
      </Routes>
    </Router>
  );
}

export default App;




