import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const NewsSlider = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY')
      .then(response => {
        setNews(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <marquee className="news-marquee" behavior="scroll" direction="left" scrollamount="5">
      {news.map((article, index) => (
        <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-item">
          {article.title}
        </a>
      ))}
    </marquee>
  );
};

export default NewsSlider;
