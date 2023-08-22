import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Review from "./Review";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Authentication from "./Authentication";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Authentication></Authentication>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
