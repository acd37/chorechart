import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

class App extends Component {
    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className='App'>
                <h1> ChoreChart </h1>
                <Login handleLogin={this.handleLogin} />
            </div>
        );
    }
}

export default App;
