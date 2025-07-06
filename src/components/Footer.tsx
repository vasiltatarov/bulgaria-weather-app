import React from 'react';
import { APP_NAME } from '../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <p>&copy; {currentYear} {APP_NAME}</p>
    </footer>
  );
};

export default Footer; 