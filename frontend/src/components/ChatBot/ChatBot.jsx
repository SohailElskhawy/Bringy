import { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [messages, setMessages] = useState([
        { type: "bot", text: "Hi! I'm your shopping assistant. What meal would you like to make today?" }
    ]);
    const [input, setInput] = useState("");
    const [productResults, setProductResults] = useState([]);
    const [customer] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        setLoading(true);
        if (!input.trim()) return;

        // Add user message
        const newMessages = [...messages, { type: "user", text: input }];
        setMessages(newMessages);

        try {
            const res = await fetch("http://localhost:5000/api/chat/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }) // Replace with actual user ID
            });
            const data = await res.json();
            setLoading(false);
            console.log("Response data:", data);
            setProductResults(data.products);
            if (data.products.length > 0) {
                    setMessages(prev => [...prev, {
                    type: "bot",
                    text: `I found the following products: `
                }]);
            }else{
                setMessages(prev => [...prev, {
                    type: "bot",
                    text: `Sorry, I couldn't find any products for "${input}".`
                }]);
            }
            setInput("");
        } catch (error) {
            console.error("Chat error:", error);
        }
    };

    const handleAddToBasket = async () => {
        try {
            if (!customer || !customer.id) {
                alert("Please log in to add products to your basket.");
                return;
            }


            const productIds = productResults.map(p => p._id);

            await fetch("http://localhost:5000/api/chat/chat/add-to-basket", {
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
        setMessages([
            { type: "bot", text: "Hi! I'm your shopping assistant. What meal would you like to make today?" }
        ]);
        setProductResults([]);
    };


    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <button onClick={toggleChatbot} className="chat-toggle-button">
                {showChatbot ? 'Close Chatbot' : 'Open Chatbot'}
            </button>

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

                                {
                                    loading && (
                                        <div className="chat-message bot-message">
                                            <p>Loading...</p>
                                            <div className="loading-spinner"></div>
                                        </div>
                                    )
                                }

                                {productResults.length > 0 && (
                                    // i want to display product name and image and price
                                    <div className="product-results">
                                        {productResults.map((product, idx) => (
                                            <div key={idx} className="product-item">
                                                <img src={product.image_url} alt={product.name} className="product-image" />
                                                <div className="product-details">
                                                    <p className="product-name">{product.name}</p>
                                                    <p className="product-price">Price: {product.price} TL</p>
                                                </div>
                                            </div>
                                        ))}
                                            <p>Add them to basket?</p>
                                        <div className="chat-message bot-message confirm">
                                            <button onClick={handleAddToBasket}>Yes, add to basket</button>
                                            <button onClick={handleClear}>No, clear chat</button>
                                        </div>
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
                                        list="suggestions"
                                    />
                                    <button className="chat-send-button" id="sendButton" onClick={sendMessage}>
                                        Send
                                    </button>
                                    <datalist id="suggestions">
                                        <option value="I want to make Grilled Cheese Sandwich">Grilled Cheese Sandwich</option>
                                        <option value="I want to make Scrambled Eggs">Scrambled Eggs</option>
                                        <option value="I want to make Peanut Butter Banana Sandwich">Peanut Butter Banana Sandwich</option>
                                        <option value="I want to make Pasta with Tomato Sauce">Pasta with Tomato Sauce</option>
                                        <option value="I want to make Rice and Fried Egg">Rice and Fried Egg</option>
                                        <option value="I want to make Instant Ramen Upgrade">Instant Ramen Upgrade</option>
                                        <option value="I want to make Tuna Salad Sandwich">Tuna Salad Sandwich</option>
                                        <option value="I want to make Oatmeal with Fruit">Oatmeal with Fruit</option>
                                        <option value="I want to make Yogurt Parfait">Yogurt Parfait</option>
                                        <option value="I want to make Quesadilla">Quesadilla</option>
                                    </datalist>

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
