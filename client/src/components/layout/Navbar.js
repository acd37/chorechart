import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

const styles = {
    nav: {
        borderRadius: 0,
        background: 'linear-gradient(90deg,#4e54c8,#8f94fb)'
    },
    navHeader: {
        color: '#fff',
        fontSize: '2rem',
        letterSpacing: 1.2
    }
};

export class Navbar extends Component {
    state = {
        activeItem: 'home',
        redirect: false
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleLogout = (e) => {
        localStorage.removeItem('chorechart');

        this.setState({
            redirect: true
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        const { activeItem } = this.state;
        return (
            <Segment inverted style={styles.nav}>
                <Menu inverted secondary>
                    <Menu.Item>
                        <span style={styles.navHeader}>ChoreChart</span>
                    </Menu.Item>
                    <Menu.Item name='home'>
                        <Link to='/dashboard/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item name='settings'>
                        <Link to='/dashboard/settings/'>Settings</Link>
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleLogout}
                    />
                </Menu>
            </Segment>
        );
    }
}

export default Navbar;
