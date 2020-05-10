import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import WelcomPage from './containers/WelcomPage/WelcomPage';
import LogIn from './containers/LogIn/LogIn';
import CreateAccount from './containers/CreateAccount/CreateAccount';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route exact path="/" component={WelcomPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
