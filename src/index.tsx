import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { App } from './App';
import store from './store/store';
import en from './locales/en.json';
import uk from './locales/uk.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    uk: {
      translation: uk
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);