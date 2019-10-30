import React from 'react';

const styles = {
    border: 'none',
    padding: 80,
    backgroundColor: '#fff'
};

function CustomCard(props) {
    return <div style={styles}>{props.children}</div>;
}

export default CustomCard;
