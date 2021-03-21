import { Avatar } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import '../styles/Layout.css';

const Layout = ({ children, logout }) => {

    const userName = localStorage.getItem('userName');

    return (
        <>
            <div className="navbar__container">
                <div className="navbar">
                    <h1>PLANNER</h1>
                    <div className="navbar__profile">
                        <Avatar alt={userName} src="https://avatars.dicebear.com/api/male/john.sv" />
                        <h3>{userName}</h3>
                        <ExitToApp onClick={logout} />
                    </div>
                </div>
            </div>
            <div className="body__container">
                <div className="body">
                    {children}
                </div>
            </div>  
        </>
    );
}

export default Layout;