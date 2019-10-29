import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';

const styles = {
    data: {
        overflowWrap: "break-word"
    }
}

export default class ChoreTile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chore: {}
        }
      }

      UNSAFE_componentWillReceiveProps() {
        axios
            .get('/api/chore', this.props.user)
            .then((res) => {
                this.setState({
                    chore: res.data
                });
            })
            .catch((err) => console.log(err.response.data));
    }

    render() {
        return (
            <div>
                <Header textAlign={"center"} as='h2'>My Chores</Header>
                <div style={styles.data}>{this.state.chore.chores}</div>
            </div>
        )
    }
}
