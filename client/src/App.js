import React from "react";
import LandingPage from "./pages/LandingPage";
import { Redirect, Route, Switch } from 'react-router-dom';
import OperatorForm from "./Operator/OperatorForm";
import LoginPage from "./UserAuth/LoginPage";
import SignupPage from "./UserAuth/SignupPage";
import OperatorDashboard from "./Operator/OperatorDashboard";

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
            <Route exact path="/operator">
                <OperatorDashboard />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
