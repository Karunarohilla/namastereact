import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    console.error(error); // Log the error for debugging

    return (
        <div>
            <h1>Oops!</h1>
            <p>Something went wrong.</p>
            {error?.message && <p>{error.message}</p>}
        </div>
    );
};

export default Error;
