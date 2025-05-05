import { useState } from 'react';
import './AdminOrders.css';
import { useNavigate } from 'react-router-dom';
import useOrders from '../../hooks/useOrders';
import PrintOrder from '../../components/PrintOrder/PrintOrder';
import OrderItemsModel from '../../components/OrderItemsModel/OrderItemsModel';
import LoadingModel from '../../components/LoadingModel/LoadingModel';


function AdminOrders() {
  const { orders, loading, refresh } = useOrders(); 
  const navigate = useNavigate();
  const [username] = useState('Admin');

  const [isOrderItemsModelOpen, setIsOrderItemsModelOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [printOrderData, setPrintOrderData] = useState(null);


  const handleSeeItems = (orderId) => {
    setSelectedOrderId(orderId);
    setIsOrderItemsModelOpen(true);
  };

  const handleSignOut = () => {
    navigate('/admin/login');
  };

  const handlePrint = async (orderId) => {
    try {
      const [orderRes, itemsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/orders/orders/${orderId}`),
        fetch(`http://localhost:5000/api/order-items/${orderId}`)
      ]);

      const orderData = await orderRes.json();
      const itemsData = await itemsRes.json();

      if (orderData.success && itemsData.success) {
        setPrintOrderData({ ...orderData.order, items: itemsData.items[0]?.products || [] });
      } else {
        console.error('Failed to load data for printing');
      }
    } catch (err) {
      console.error('Error printing order:', err);
    }
  };


  const handleUpdateOrderStatus = (orderId, status) => {
    fetch(`http://localhost:5000/api/orders/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Order status updated successfully:', data.order);
          refresh();
        } else {
          console.error('Failed to update order status:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  }

  return (
    <div className="admin-orders-container">
      <header className="admin-header">
        <nav>
          <button onClick={() => navigate("/admin/orders")} className='clicked'>Orders</button>
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
          {loading ? (
            <tr>
              <LoadingModel />
            </tr>
          ) : orders.length === 0 ? (
            <tr>
              <td colSpan="8">No orders found</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customerId}</td>
                <td>{order.is_delivered ? 'Yes' : 'No'}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{new Date(order.updatedAt).toLocaleString()}</td>
                <td>{order.paymentMethod}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleSeeItems(order._id)}>See Items</button>
                  <button onClick={() => handlePrint(order._id)}>Print</button>
                  <button onClick={() => {
                    handleUpdateOrderStatus(order._id, { is_delivered: !order.is_delivered });
                  }}>
                    {order.is_delivered ? 'Mark as Undelivered' : 'Mark as Delivered'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isOrderItemsModelOpen && selectedOrderId && (
        <OrderItemsModel
          orderId={selectedOrderId}
          onClose={() => setIsOrderItemsModelOpen(false)}
        />
      )}

      {printOrderData && (
        <PrintOrder
          order={printOrderData}
          onClose={() => setPrintOrderData(null)}
        />
      )}

    </div>
  );
}

export default AdminOrders;
