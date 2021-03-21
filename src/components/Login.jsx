import React from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../firebase';

const Login = ({ loginHandler }) => {

    return (
        <div>
            <button onClick={loginHandler}>Login</button>
        </div>
    );
}

export default Login;