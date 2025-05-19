import { useNavigate } from 'react-router-dom';
import './Basket.css';
import useGetBasket from '../../hooks/useGetBasket';
import { useState } from 'react';
import LoadingModel from '../../components/LoadingModel/LoadingModel';

function Basket() {
	const navigate = useNavigate();
	const [customer] = useState(JSON.parse(localStorage.getItem('user')));
	const { basket, loading } = useGetBasket(customer?.id);
	

	const handleCheckout = () => {
		navigate('/checkout');
	};

	const handleIncrease = async (productId) => {
		try {
			const response = await fetch('http://localhost:5000/api/basket/basket/increase-quantity', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customerId: customer.id,
					productId
				})
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || 'Failed to increase product quantity');
				return;
			}

			alert('Product quantity increased successfully!');

		} catch (error) {
			console.error('Error increasing product quantity:', error);
			alert('An error occurred while increasing product quantity');
		}
	}

	const handleDecrease = async (productId) => {
		try {
			const response = await fetch('http://localhost:5000/api/basket/basket/decrease-quantity', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customerId: customer.id,
					productId
				})
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || 'Failed to decrease product quantity');
				return;
			}

			alert('Product quantity decreased successfully!');

		} catch (error) {
			console.error('Error decreasing product quantity:', error);
			alert('An error occurred while decreasing product quantity');
		}
	}

	const handleRemove = async (productId) => {
		try {
			const response = await fetch('http://localhost:5000/api/basket/basket/remove-product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customerId: customer.id,
					productId
				})
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || 'Failed to remove product from basket');
				return;
			}

			alert('Product removed from basket successfully!');

		} catch (error) {
			console.error('Error removing product:', error);
			alert('An error occurred while removing product');
		}
	}

	const onClear = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/basket/basket/clear', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customerId: customer.id
				})
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || 'Failed to clear basket');
				return;
			}

			alert('Basket cleared successfully!');

		} catch (error) {
			console.error('Error clearing basket:', error);
			alert('An error occurred while clearing basket');
		}

	}

	return (
		<div className="basket-container">
			<header className="basket-header">
				<div className="logo">Bringy</div>
				<h2>Your Basket</h2>
			</header>

			<button className='basket_page_button' onClick={() => navigate('/')}>Go Shopping</button>

			{
				(basket && basket[0].products.length > 0) ? (
					<div className="master-container">
						<div className="card cart">
							<label className="title">Your cart</label>
							<div className="products">
								{basket[0].products.map((item) => (
									<div key={item._id} className="product">
										<img src={item.productId.image_url} alt={item.productId.name} />
										<div className="product-details">
											<h3>{item.productId.name}</h3>
											<span>{item.productId.price} TL</span>
										</div>
										<div className="quantity">
											<button onClick={() => 
												handleDecrease(item.productId._id)
											}>
												<svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
													<path  stroke="#47484b" d="M20 12L4 12"></path>
												</svg>
											</button>
											<label>
												{item.quantity}
											</label>
											<button onClick={() => handleIncrease(item.productId._id)}>
												<svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
													<path   stroke="#47484b" d="M12 4V20M20 12H4"></path>
												</svg>
											</button>
										</div>
										<button className="remove-btn" onClick={() => 
											handleRemove(item.productId._id)
										}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
										</button>
									</div>
								))}
							</div>
							<button className="clear-btn" onClick={onClear}>Clear Basket</button>
						</div>
						<div className="card checkout">
							<label className="title">Checkout</label>
							<div className="checkout--footer">
								<label className="price">{
									basket[0].products.reduce((total, item) => {
										return total + (item.productId.price * item.quantity);
									}, 0).toFixed(2)
								} TL</label>
								<button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
							</div>
						</div>
					</div>
				) : (
					<div className="empty-basket">
						<h2>Your basket is empty</h2>
					</div>
				)
			}

			{loading && (
				<LoadingModel />
			)}
		</div>
	);
}

export default Basket;
