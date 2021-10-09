import React from "react";
import LandingPage from "./pages/LandingPage";
import { Redirect, Route, Switch } from 'react-router-dom';
import OperatorForm from "./Operator/OperatorForm";
import LoginPage from "./UserAuth/LoginPage";
import SignupPage from "./UserAuth/SignupPage";

function App() {
  return (
    <div>
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
