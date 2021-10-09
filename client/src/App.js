import React from "react";
import LandingPage from "./pages/LandingPage";
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
