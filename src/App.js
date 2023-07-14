import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Signup />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/todo">
          <Todo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
