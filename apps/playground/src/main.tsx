import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PolarisProvider } from '@cin7/polaris-adapter';
import '@cin7/design-tokens/css';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PolarisProvider>
        <App />
      </PolarisProvider>
    </BrowserRouter>
  </React.StrictMode>
);