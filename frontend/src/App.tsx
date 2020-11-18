import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Home from './views/Home';
import AstronautDetails from "./views/AstronautDetails";
import AddAstronaut from "./views/AddAstronaut";
import AstronautEdition from "./views/AstronautEdition";

function App() {
  
  return (
    
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/astronaut-details" component={AstronautDetails}></Route>
          <Route path="/astronaut-edition" component={AstronautEdition}></Route>
          <Route path="/add-astronaut">
            <AddAstronaut />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
