import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error('Det gick inte att hitta ett element med ID "root" i DOM.');
}

