import React, { useEffect, useState } from 'react';
import './OrderItemsModel.css';

function OrderItemsModel({ orderId, onClose }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        setLoading(true);
        fetch(`http://localhost:5000/api/orderItems/order-items/${orderId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setItems(data);
                } else {
                    console.error('Failed to fetch order items:', data.message);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching order items:', err);
                setLoading(false);
            });
    }, [orderId]);

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-header">
                <h2>Order Items for {orderId.substring(0,5) + '....'}</h2>
                <button className="close-button" onClick={onClose}>Close</button>
                </div>
                {loading ? (
                    <p>Loading items...</p>
                ) : items.length === 0 ? (
                    <p>No items found for this order.</p>
                ) : (
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items[0]?.products?.map((item, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <img src={item.productId.image_url} alt={item.productId.name} className="product-image-table" />
                                    </td>
                                    <td>{item.productId.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default OrderItemsModel;
