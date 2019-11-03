import React from 'react';

function User(props) {
    return (
        <div style={{ marginTop: 20 }}>
            <img alt='thumbnail' className='ui avatar image' src={props.user.thumbnail} />
            <span>
                {props.user.firstName} {props.user.lastName}
            </span>
        </div>
    );
}

export default User;
