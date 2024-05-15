import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

export default function renderUi() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
