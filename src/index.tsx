import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import HandleCallback from './auth/HandleCallback';
import reportWebVitals from './reportWebVitals';
import { ClientProvider } from './auth/ClientProvider';
import { store } from './app/store';

import './i18n/i18n';

import './assets/styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HandleCallback>
        <ClientProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ClientProvider>
      </HandleCallback>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
