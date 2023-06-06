/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';

//dev-3vjjtpa16my4bly6.us.auth0.com
//H7Rt21nC7DhgYtrjHZzAVXFQdGKgtgdJ

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-3vjjtpa16my4bly6.us.auth0.com"
    clientId="H7Rt21nC7DhgYtrjHZzAVXFQdGKgtgdJ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation='localstorage'>
    <GithubProvider>
    <App />
    </GithubProvider>
    </Auth0Provider> 
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
