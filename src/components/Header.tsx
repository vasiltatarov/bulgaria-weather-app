import React, { useEffect, useState } from 'react';
import { APP_NAME } from '../utils/constants';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = APP_NAME }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add animation after component mounts
    setIsVisible(true);
  }, []);
  
  return (
    <header className={`app-header ${isVisible ? 'fade-in' : ''}`}>
      <h1>{title}</h1>
      <div className="weather-icon-small">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png" 
          alt="Weather Icon" 
          className="header-icon"
        />
      </div>
    </header>
  );
};

export default Header; 