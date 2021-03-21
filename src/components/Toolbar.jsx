import React from 'react';
import '../styles/Layout.css';
import ModalBody from './Modal';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <ModalBody type='week'>
                <button className="ghost__button toolbar__button">Add week</button>
            </ModalBody>
            <ModalBody type='day'>
                <button>Add Day</button>
            </ModalBody>
        </div>
    );
}

export default Toolbar;