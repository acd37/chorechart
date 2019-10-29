import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './components/common/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
// import NoMatch from './components/pages/NoMatch';

// persistent login
if (localStorage.chorechart) {
    setAuthToken(localStorage.chorechart);
}

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute path='/dashboard' component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default App;
