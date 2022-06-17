import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '~/model/store';
import { globalStyles } from '~/globalStyles';
import Router from '~/router/Router';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={true} />
        )}
        <Global styles={globalStyles} />
        <BrowserRouter basename="/">
          <Router />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
  rootElement,
);
