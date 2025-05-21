import { useNavigate } from 'react-router-dom';
import './CustomerOrders.css'
import { useEffect, useState } from 'react';
import LoadingModel from '../../components/LoadingModel/LoadingModel';
import PrintOrder from '../../components/PrintOrder/PrintOrder';
import OrderItemsModel from '../../components/OrderItemsModel/OrderItemsModel';
import useCustomerOrders from '../../hooks/useCustomerOrders';

function CustomerOrders() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  console.log(user);
  const { orders, loading } = useCustomerOrders(user.id);
  const [isOrderItemsModelOpen, setIsOrderItemsModelOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [printOrderData, setPrintOrderData] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/customer/login');
  };

  const handleSeeItems = (orderId) => {
    setSelectedOrderId(orderId);
    setIsOrderItemsModelOpen(true);
  };
  const handlePrint = async (orderId) => {
    try {
      const [orderRes, itemsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/orders/orders/${orderId}`),
        fetch(`http://localhost:5000/api/orderItems/order-items/${orderId}`)
      ]);

      const orderData = await orderRes.json();
      const itemsData = await itemsRes.json();
      console.log(orderData, itemsData);

      if (orderData && itemsData) {
        setPrintOrderData({ ...orderData, items: itemsData[0]?.products || [] });
      } else {
        console.error('Failed to load data for printing');
      }
    } catch (err) {
      console.error('Error printing order:', err);
    }
  };
  return (
    <div>
      <header className="home-header">
        <div className="logo">Bringy</div>
        <div className="user-controls">
          {
            user.name ? (
              <div className="user-info">
                <span>Hi, {user.name}</span>
                <button onClick={() => handleLogout()}>Logout</button>
                <button onClick={() => navigate('/basket')}>Basket</button>
              </div>
            ) : (
              <div className="login-signup">
                <button onClick={() => navigate('/customer/login')}>Login</button>
                <button onClick={() => navigate('/customer/register')}>Sign Up</button>
              </div>
            )
          }
        </div>
      </header>
      <button className='basket_page_button' onClick={() => navigate('/')}>Go Shopping</button>
      {/* table of the customer orders */}
      {orders && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Delivered</th>
              <th>Payment</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8">No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 5) + '...'}</td>
                  <td>{order.address}</td>
                  <td className='date_td'>{new Date(order.createdAt).toLocaleString()}</td>
                  <td className='date_td'>{new Date(order.updatedAt).toLocaleString()}</td>
                  <td>{order.is_delivered ? 'Yes' : 'No'}</td>
                  <td>{order.paymentMethod}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleSeeItems(order._id)}>See Items</button>
                    <button onClick={() => handlePrint(order._id)}>Print</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {loading && (
        <LoadingModel />
      )}
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
  )
}

export default CustomerOrders