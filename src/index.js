import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './State/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertDialog from './Utils/AlertDialog';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertDialog} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

reportWebVitals();
