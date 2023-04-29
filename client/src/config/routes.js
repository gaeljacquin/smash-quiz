import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Smash from '../pages/smash';
import NotFound from '../pages/notfound';

const history = createBrowserHistory();

const routes = () => (
  <>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Smash} />
        <Route exact path='/smash'>
          <Redirect to='/' />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </>
);

export default routes
