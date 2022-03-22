import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import HandleCallback from './components/auth/HandleCallback';
import reportWebVitals from './reportWebVitals';
import StoreProvider from './redux/StoreProvider';
import ScrollToTop from './utils/scrollToTop';
import { ClientProvider } from './components/auth/ClientProvider';
import { ApiAccessTokenProvider } from './components/api/ApiAccessTokenProvider';

import './i18n/i18n';

import './assets/styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <HandleCallback>
          <ClientProvider>
            <ApiAccessTokenProvider>
              <ScrollToTop />
              <App />
            </ApiAccessTokenProvider>
          </ClientProvider>
        </HandleCallback>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
