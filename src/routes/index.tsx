import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Stations from '../pages/Stations';
import Details from '../pages/Details';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Stations} />
    <Route path="/details/:station+" component={Details} />
  </Switch>
);

export default Routes;
