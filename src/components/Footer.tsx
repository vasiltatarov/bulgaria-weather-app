import React, { useEffect, useState } from 'react';
import { APP_NAME, APP_VERSION } from '../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add animation after component mounts
    setIsVisible(true);
  }, []);
  
  return (
    <footer className={`app-footer ${isVisible ? 'fade-in' : ''}`}>
      <p>&copy; {currentYear} {APP_NAME} v{APP_VERSION}</p>
    </footer>
  );
};

export default Footer; 