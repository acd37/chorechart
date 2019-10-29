import React from 'react';
import { Loader } from 'semantic-ui-react';

function Loading() {
    return (
        <Loader active size='small' inline='centered'>
            Loading...
        </Loader>
    );
}

export default Loading;
