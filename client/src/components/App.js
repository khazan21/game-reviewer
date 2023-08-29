import React, { useContext, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Review from "./Review";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Authentication from "./Authentication";
import { UserContext } from "../context/user";

function App() {

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch('/authenticate')
      .then(r => {
        if (r.ok) {
          r.json().then(userObject => setUser(userObject))
        }
      })
  }, [])

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
        <Route path="/reviews/:gameId">
          <Review></Review>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
