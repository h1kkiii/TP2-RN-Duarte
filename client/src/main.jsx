import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NotesProvider } from './context/NotesContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <NotesProvider>
      <App />
    </NotesProvider>
);