import React from 'react';
import '../styles/Login.css';

const Login = ({ loginHandler }) => {

    return (
        <div className="login">
            <h1>Planner</h1>
            <button onClick={loginHandler}>
                Login with Google
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"></img>
            </button>
        </div>
    );
}

export default Login;