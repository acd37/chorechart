import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import Settings from '../dashboard/Settings';
import Main from '../dashboard/Main';

const styles = {
    wrapper: {
        width: '1200px',
        maxWidth: '90%',
        margin: '50px auto'
    }
};

class Dashboard extends Component {
    state = {
        user: {}
    };

    // componentDidMount() {
    //     this.handleGetUser();
    // }

    handleGetUser = () => {
        axios
            .get('/api/user/current')
            .then((res) => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => console.log(err.response.data));
    };

    render() {
        const { user } = this.state;

        return (
            <div>
                <Navbar />
                <div style={styles.wrapper}>
                    <Route exact path='/dashboard' component={() => <Main user={user} />} />
                    <Route
                        exact
                        path='/dashboard/settings'
                        component={() => <Settings user={user} />}
                    />
                </div>
            </div>
        );
    }
}

export default Dashboard;
