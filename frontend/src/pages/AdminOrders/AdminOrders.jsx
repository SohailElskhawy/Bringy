import { useState } from 'react';
import './AdminOrders.css';
import { useNavigate } from 'react-router-dom';

const fakeData = [
  {
    id: 1,
    customerId: 101,
    is_delivered: true,
    createdAt: '2023-10-01',
    updatedAt: '2023-10-02',
    paymentMethod: 'Credit Card',
    totalPrice: 50.00,
  }
];

function AdminOrders() {
  const navigate = useNavigate();
  const [username] = useState('Admin'); // Replace with actual user info if available

  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log('Signing out...');
  };

  const handleSeeItems = (orderId) => {
    // Logic to see items in the order
    console.log(`See items for order ${orderId}`);
  };

  const handlePrint = (orderId) => {
    // Logic to print the order
    console.log(`Print order ${orderId}`);
  };

  return (
    <div className="admin-orders-container">
      <header className="admin-header">
        <nav>
          <button onClick={() => navigate("/admin/orders")}>Orders</button>
          <button onClick={() => navigate("/products")}>Products</button>
        </nav>
        <div className="admin-welcome">
          <span>Welcome, {username}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <h1>Admin Orders</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Delivered</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Payment</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeData.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerId}</td>
              <td>
                <select value={order.is_delivered} onChange={(e) => {
                  // Logic to update the delivery status
                  console.log(`Update delivery status for order ${order.id} to ${e.target.value}`);
                }}>
                  <option value="true" selected={order.is_delivered}>Yes</option>
                  <option value="false" selected={!order.is_delivered}>No</option>
                </select>
              </td>
              <td>{order.createdAt}</td>
              <td>{order.updatedAt}</td>
              <td>{order.paymentMethod}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <button onClick={() => handleSeeItems(order.id)}>See Items</button>
                <button onClick={() => handlePrint(order.id)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
