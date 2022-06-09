import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { globalStyles } from '~/src/globalStyles';
import Router from '~/src/router/Router';
import 'react-calendar/dist/Calendar.css';
import { store } from '~/src/redux/store';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/">
        <Provider store={store}>
          <Global styles={globalStyles} />
          <Router />
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  rootElement,
);
