/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import RandomGenerator from './RandomGenerator';
import './RandomGenerator.scss';

ReactDOM.render(
  <BrowserRouter>
      <Route exact path="/" component={RandomGenerator}/>
  </BrowserRouter>,
  /* eslint-disable */ 
  document.getElementById('app')
  /* eslint-enable */
);
