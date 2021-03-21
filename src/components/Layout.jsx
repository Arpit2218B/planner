import React from 'react';
import '../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <>
            <div className="navbar__container">
                <div className="navbar">
                    <h1>PLANNER</h1>
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