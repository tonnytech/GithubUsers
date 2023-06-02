/* eslint-disable */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Dashboard, Login, PrivateRoute, AuthWrapper, Error,
} from './pages';

function App() {
  return (
    <div>
      <Dashboard />
      <Login />
    </div>
  );
}

export default App;
