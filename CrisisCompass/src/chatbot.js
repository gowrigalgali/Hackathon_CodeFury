import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css'; // Import custom CSS

const GEMINI_API_KEY = 'AIzaSyDPSjBkOX0zl4HpCK16oLQp4lPfd4rYWNU'; // Gemini API Key
const YOUTUBE_API_KEY = 'AIzaSyD4D2ObDR1t9-66_DA1rSm38yfSKiSA9cU'; // YouTube API Key
const GEMINI_API_URL = 'https://your-api-endpoint.com/chat'; // Replace with your actual API endpoint

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
          history: [],
          instruction: "In this chat, focus on educating about disaster preparedness in a clear and friendly manner.",
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponse(result.response); // Adjust based on your API's response structure
    } catch (error) {
      console.error('Error fetching response from Gemini API:', error);
      setResponse('Error fetching response.');
    }
  };

  const handleSearch = async () => {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&relevanceLanguage=en&maxResults=5&key=${YOUTUBE_API_KEY}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  return (
    <div className="app">
      <h1>🛡️ Disaster Preparedness Chatbot</h1>

      <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything about disaster preparedness:"
        />
        <button type="submit">Send</button>
      </form>

      {response && <p>{response}</p>}

      <h2>Educational Videos</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for videos on disaster preparedness"
      />
      <button onClick={handleSearch}>Search</button>

      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.id.videoId}`} controls />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
