import { SpeakerNotesOff } from '@material-ui/icons';
import React from 'react';
import '../styles/Layout.css';
import ModalBody from './Modal';

const EmptyCard = ({ type }) => {
    return (
        <div className="loading">
            <SpeakerNotesOff fontSize="large" />
            <h2>No data present</h2>
            {type == undefined ? null : (
                <ModalBody type={type} now={true}>
                    <button style={{margin: "10px 0"}} className="toolbar__button">Add {type}</button>
                </ModalBody>
            )}
        </div>
    );
}

export default EmptyCard;