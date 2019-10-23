import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        user: {}
    };

    componentDidMount() {
        const id = this.props.location.state.userID;

        axios
            .get('/api/user/current')
            .then((res) => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => console.log(err.response.data));
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <div>{JSON.stringify(this.state.user)}</div>
            </div>
        );
    }
}

export default Dashboard;
