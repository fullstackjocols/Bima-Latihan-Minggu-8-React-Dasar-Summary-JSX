// src/App.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';

const videoData = [
  {
    id: 1,
    title: 'React: The Documentary',
    description: 'The origin story of React',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Introducing React Hooks',
    description: 'Learn about React hooks',
    thumbnail: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'React 18 Keynote',
    description: 'Latest features in React 18',
    thumbnail: 'https://via.placeholder.com/150',
  },
];

function VideoItem({ video }) {
  return (
    <div className="video-item">
      <img src={video.thumbnail} alt={video.title} className="thumbnail" />
      <div className="video-details">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
      </div>
    </div>
  );
}

function VideoList({ videos }) {
  return (
    <div>
      {videos.map(video => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
}

function SearchBar({ onSearch }) {
  const handleInputChange = useCallback((e) => {
    onSearch(e.target.value);
  }, [onSearch]);

  return <input type="text" onChange={handleInputChange} placeholder="Search videos..." />;
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(videoData);
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => video.title.toLowerCase().includes(searchText.toLowerCase()));
  }, [videos, searchText]);

  return (
    <div className={`app-container ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>Vite + React Video List</h1>
      <SearchBar onSearch={setSearchText} />
      <VideoList videos={filteredVideos} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
