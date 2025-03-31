import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// const indexeddbSetup = require("~/scripts/indexeddb.js").default;
const indexeddbSetup = require("./indexeddb.js").default;
indexeddbSetup();

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' })
//       .then((registration) => {
//         console.log('Service Worker registered successfully:', registration);
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }

// Report web vitals
reportWebVitals(console.log);