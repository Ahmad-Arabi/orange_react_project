import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import contentReducer from './store/contentSlice';
import userReducer from './store/userSlice'; // Add this import
import App from './App';
import './assets/styles/main.css';

// Configure Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    user: userReducer // Add this reducer
  }
});

// Use createRoot API for React 18
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);