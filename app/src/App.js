import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import WelcomPage from "./containers/WelcomPage/WelcomPage";
import Authentication from "./containers/Authentication/Authentication";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/authentication/:type"
            render={(props) => <Authentication {...props} />}
          />
          <Route exact path="/" component={WelcomPage} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
