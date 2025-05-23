import { useState } from 'react';
import './Chatbot.css';

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [productResults, setProductResults] = useState([]);
    const [customer] = useState(JSON.parse(localStorage.getItem('user')));


    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const newMessages = [...messages, { type: "user", text: input }];
        setMessages(newMessages);

        try {
            const res = await fetch("http://localhost:5000/chat/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input}) // Replace with actual user ID
            });
            const data = await res.json();

            setProductResults(data.products);
            setMessages(prev => [...prev, {
                type: "bot",
                text: `I found the following products: ${data.products.map(p => p.name).join(", ")}. Add them to basket?`
            }]);

            setInput("");
        } catch (error) {
            console.error("Chat error:", error);
        }
    };

    const handleAddToBasket = async () => {
        try {
            const productIds = productResults.map(p => p._id);

            await fetch("http://localhost:5000/chat/chat/add-to-basket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: customer.id, productIds })
            });

            setMessages([{ type: "bot", text: "Products added to basket!" }]);
            setProductResults([]);
        } catch (error) {
            console.error("Basket error:", error);
        }
    };

    const handleClear = () => {
        setMessages([]);
        setProductResults([]);
    };


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
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`chat-message ${msg.type}-message`}>
                                        {msg.text}
                                    </div>
                                ))}

                                {productResults.length > 0 && (
                                    <div className="chat-message bot-message">
                                        <button onClick={handleAddToBasket}>Yes, add to basket</button>
                                        <button onClick={handleClear}>No, clear chat</button>
                                    </div>
                                )}
                            </div>

                            <div className="chat-footer">
                                <div className="chat-input-group">
                                    <input
                                        placeholder="Type your message..."
                                        className="chat-input"
                                        id="chatInput"
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <button className="chat-send-button" id="sendButton" onClick={sendMessage}>
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
