import React from 'react';
import { APP_NAME } from '../utils/constants';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = APP_NAME }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header; 