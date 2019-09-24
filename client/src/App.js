import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <h1> ChoreChart </h1>
                <Login />
            </div>
        );
    }
}

export default App;
