import { useEffect } from 'react';
import './PrintOrder.css'; // We'll create this next

function PrintOrder({ order, onClose }) {
  useEffect(() => {
    setTimeout(() => {
      window.print();
      onClose(); // Close print view after printing
    }, 1000);
  }, [onClose]);

  if (!order) return null;

  return (
    <div className="print-container">
      <h1>Order Summary</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Customer ID:</strong> {order.customerId}</p>
      <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
      <p><strong>Delivered:</strong> {order.is_delivered ? 'Yes' : 'No'}</p>
      <p><strong>Payment:</strong> {order.paymentMethod}</p>
      <p><strong>Total Price:</strong> {order.totalPrice.toFixed(2)} TL</p>

      <h2>Items</h2>
      <table className="print-items-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, idx) => (
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
    </div>
  );
}

export default PrintOrder;
