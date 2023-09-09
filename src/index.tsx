import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./services/index";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(thunk))
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
