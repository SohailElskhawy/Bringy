import LoadingModel from '../../components/LoadingModel/LoadingModel';
import useCategories from '../../hooks/useCategories';
import useProducts from '../../hooks/useProducts';
import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	const [category, setCategory] = useState('');
	const { categories, loading } = useCategories();
	const { products } = useProducts(category, sortOrder, search);
	const [user, setUser] = useState({});


	const addToBasket = async (productId, quantity = 1) => {
		const token = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));

		if (!user?.name || !token) {
			alert('Please log in to add products to your basket.');
			navigate('/customer/login');
			return;
		}

		try {
			console.log(user, {
				customerId: user.id,
				productId,
				quantity
			})
			const response = await fetch('http://localhost:5000/api/basket/basket/add-product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customerId: user.id,
					productId,
					quantity
				})
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || 'Failed to add product to basket');
				return;
			}

			alert('Product added to basket successfully!');
		} catch (error) {
			console.error('Error adding to basket:', error);
			alert('An error occurred while adding to basket');
		}
	};



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


	return (
		<div className="home-container">
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

			<div className="home-body">
				<aside className="category-list" >
					{categories.map(cat => (
						<button key={cat.name}
							className={`category-button ${cat._id === category ? 'active' : ''}`}
							onClick={() => {
								setCategory(cat._id);
							}}
						>{cat.name}</button>
					))}
					{
						category && (
							<button className="clear-category" onClick={() => setCategory('')}>Clear Category</button>
						)
					}
				</aside>

				<main className="product-area">
					<div className="search-sort">
						<input
							type="text"
							placeholder="Search products..."
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
						<label className="sort-label">
							Sort by:
							<select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
								<option value="">Select</option>
								<option value="asc">Price: Low to High</option>
								<option value="desc">Price: High to Low</option>
							</select>
						</label>
					</div>

					<div className="product-list">
						{products.map(product => (
							<div key={product._id} className="product-card">
								<img src={product.image_url} alt={product.name} className='product-img' />
								<div className="product-info">
									<h3>{product.name}</h3>
									<p>Supplier: {product.supplier_id.name}</p>
									<p>Price: {product.price.toFixed(2)} TL</p>
									<button onClick={() => addToBasket(product._id)}>Add to Basket</button>
								</div>
							</div>
						))}
					</div>
				</main>
			</div>
			{
				loading && (
					<LoadingModel />
				)
			}
		</div>
	);
}

export default Home;
