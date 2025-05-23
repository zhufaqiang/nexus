'use client';
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen show">
      <div className="loading-text-container">
        <div className="loading-bar"></div>
        <div className="loading-text">自由に、未来に、輝く</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
