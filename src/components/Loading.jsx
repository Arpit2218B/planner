import { CircularProgress } from '@material-ui/core';
import React from 'react';
import '../styles/Layout.css';

const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress size="96px" color={"yellow"} />
        </div>
    );
}

export default Loading;