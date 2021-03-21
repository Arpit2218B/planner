import React from 'react';
import '../styles/Card.css';

const Card = ({ children, full }) => {
    return (
        <div className={full ? "card card__full": "card"}>
            {children}
        </div>
    );
}

export default Card;