import React from "react";
import LandingPage from "./Pages/LandingPage";
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from "./UserAuth/LoginPage";
import SignupPage from "./UserAuth/SignupPage";
import Logo from "./Components/Logo";

function App() {
  return (
    <div>
        <Logo />
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route exact path="/login">
                <LoginPage />
            </Route>
            <Route exact path="/signup">
                <SignupPage />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
