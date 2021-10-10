import React from 'react';
import axios from 'axios';
import LandingPage from './pages/LandingPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginPage from './UserAuth/LoginPage';
import SignupPage from './UserAuth/SignupPage';
import NavBar from './Components/NavBar';
import OperatorDashboard from './Operator/OperatorDashboard';
import CfsDashboard from './Cfs/CfsDashboard';
import CfsOperatorForm from './Cfs/CfsOperatorForm';
import OperatorForm from './Operator/OperatorForm';
import OperatorTruckForm from './Operator/OperatorTruckForm';

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

function App() {
    return (
        <Provider store={store}>
            <div>
                <NavBar />
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
                    <Route exact path="/cfs">
                        <CfsDashboard />
                    </Route>
                    <Route exact path="/cfs/addOperator">
                        <CfsOperatorForm />
                    </Route>
                    <Route exact path="/operator">
                        <OperatorDashboard />
                    </Route>
                    <Route exact path="/operator/addDelivery">
                        <OperatorForm />
                    </Route>
                    <Route exact path="/operator/addTruck">
                        <OperatorTruckForm />
                    </Route>
                </Switch>
            </div>
        </Provider>
    );
}

export default App;
