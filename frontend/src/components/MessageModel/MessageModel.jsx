import React from 'react';
import './MessageModel.css';

const MessageModel = ({ message, onClose }) => {
    if (!message) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default MessageModel;
