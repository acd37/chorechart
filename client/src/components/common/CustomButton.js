import React from 'react';
import { Button } from 'semantic-ui-react';

const styles = {
    primary: {
        background: 'linear-gradient(90deg,#4e54c8,#8f94fb)',
        borderRadius: 40,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 300,
        letterSpacing: 1.2
    }
};

function CustomButton(props) {
    return (
        <Button style={styles[props.style]} fluid={props.fluid} type={props.type}>
            {props.children}
        </Button>
    );
}

export default CustomButton;
