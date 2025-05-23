import { useState } from 'react';
import './Chatbot.css';

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Toggle Button */}
            <button onClick={toggleChatbot} className="chat-toggle-button">
                {showChatbot ? 'Close Chatbot' : 'Open Chatbot'}
            </button>

            {/* Chatbot */}
            {showChatbot && (
                <div className="chatbot-wrapper">
                    <div className="chat-container">
                        <div className="chat-wrapper">
                            <div className="chat-header">
                                <div className="chat-header-content">
                                    <h2 className="chat-title">Chatbot Assistant</h2>
                                    <div className="chat-status">Online</div>
                                </div>
                            </div>
                            <div className="chat-body" id="chatDisplay">
                                <div className="chat-message user-message">
                                    Hello! How can I assist you today?
                                </div>
                                <div className="chat-message bot-message">
                                    Hello! I need a Chatbot!
                                </div>
                            </div>
                            <div className="chat-footer">
                                <div className="chat-input-group">
                                    <input
                                        placeholder="Type your message..."
                                        className="chat-input"
                                        id="chatInput"
                                        type="text"
                                    />
                                    <button className="chat-send-button" id="sendButton">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
