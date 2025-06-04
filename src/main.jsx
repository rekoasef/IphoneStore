// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa el componente App desde App.jsx
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App /> {/* Usa el componente App importado */}
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// NINGÚN "export default App;" AQUÍ