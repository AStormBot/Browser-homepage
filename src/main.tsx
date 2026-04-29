import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './renderer/App';
import './styles.css';
createRoot(document.getElementById('root')!).render(<App />);
