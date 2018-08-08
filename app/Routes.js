import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TemplatesList from './features/TemplatesList';
import TemplatePage from './features/TemplatePage';
import NotFound from './components/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          component={TemplatesList}
          exact
          path='/'
        />
        <Route
          component={TemplatePage}
          exact
          path='/templates/:id'
        />
        <Route
          component={NotFound}
          path='*'
        />
      </Switch>
    );
  }
}

export default Routes;
