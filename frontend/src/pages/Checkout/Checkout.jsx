import { useState } from 'react'
import './Checkout.css'
import { useNavigate } from 'react-router-dom';
import useGetBasket from '../../hooks/useGetBasket';
import LoadingModel from '../../components/LoadingModel/LoadingModel';

function Checkout() {
	const navigate = useNavigate();
	const [customer] = useState(JSON.parse(localStorage.getItem('user')));
	const [address, setAddress] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("");
	const { basket, loading } = useGetBasket(customer?.id);

	const handleCheckout = async () => {
		
		if (address === "" || paymentMethod === "") {
			alert("Please fill in all fields");
			return;
		}
		// save order address and payment method to the database
		const order = {
			customerId: customer.id,
			is_delivered: false,
			paymentMethod: paymentMethod,
			totalPrice: basket[0].products.reduce((total, item) => total + (item.productId.price * item.quantity), 0),
			address: address
		}

		const response = await fetch('http://localhost:5000/api/orders/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(order),
		});
		if (!response.ok) {
			alert("Error saving order");
			return;
		}

		const orderData = await response.json();
		// save the order items to the database
		
		const orderItemsData = {
			orderId: orderData._id,
			products: basket[0].products.map((item) => ({
				productId: item.productId._id,
				quantity: item.quantity,
				price: item.productId.price,
			}))
		}
		const responseOrderItems = await fetch('http://localhost:5000/api/orderItems/order-items', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderItemsData),
		});
		if (!responseOrderItems.ok) {
			alert("Error saving order items");
			return;
		}
		//clear user baseket by customer id 
		const responseClearBasket = await fetch(`http://localhost:5000/api/basket/basket/clear`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ customerId: customer.id }),
		});
		
		if (!responseClearBasket.ok) {
			alert("Error clearing basket");
			return;
		}


		alert("Order placed successfully");
		
		// redirect user to orders page
		navigate('/customer/orders');
	}


	return (
		<div className="checkout">
			<div className="checkout__summary">
				<h2>Order Summary</h2>
				<div className="products">
					{basket && basket[0].products.map((item) => (
						<div key={item._id} className="product">
							<div className="product-details">
								<img src={item.productId.image_url} alt={item.productId.name} />
								<div className="product-info">
									<h3>{item.productId.name}</h3>
									<span>{item.productId.price} TL</span>
									<span>Quantity:{item.quantity}</span>
								</div>
							</div>
							<div className="quantity">
								<label>
									{item.productId.price * item.quantity} TL
								</label>
							</div>
						</div>
					))}

					<div className="total">
						<h3>Total: {basket && basket[0].products.reduce((total, item) => total + (item.productId.price * item.quantity), 0)} TL</h3>
					</div>
				</div>
			</div>
			<div className="checkout__form">
				<h2>Address Form</h2>
				<label>
					Address:
					<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
				</label>
			</div>
			<div className="checkout__payment">
				<h2>Payment Method</h2>
				<label>
					<input type="radio" value="credit_card" checked={paymentMethod === "credit_card"} onChange={(e) => setPaymentMethod(e.target.value)} />
					Credit Card
				</label>
				<label>
					<input type="radio" value="cash" checked={paymentMethod === "cash"} onChange={(e) => setPaymentMethod(e.target.value)} />
					Cash
				</label>
				<p>Note: Payment is done when the items are delivered at your door.</p>
			</div>
			<button className="checkout__confirm" onClick={handleCheckout}>Confirm Order</button>
			{
				loading && (
					<LoadingModel />
				)
			}
		</div>
	)
}

export default Checkout