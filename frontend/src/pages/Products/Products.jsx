import { useEffect, useState } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';
import AddProductModel from '../../components/AddProductModel/AddProductModel';
import YesNoModel from '../../components/YesNoModel/YesNoModel';
import useProducts from '../../hooks/useProducts';
import LoadingModel from '../../components/LoadingModel/LoadingModel';
import CategoryModel from '../../components/CategoryModel/CategoryModel';
import SupplierModel from '../../components/SupplierModel/SupplierModel';
import MessageModel from '../../components/MessageModel/MessageModel';

function Products() {
	const { products, loading, refresh } = useProducts();

	
	const navigate = useNavigate();
	const [isAddProductModelOpen, setIsAddProductModelOpen] = useState(false);
	const [isAddCategoryModelOpen, setIsAddCategoryModelOpen] = useState(false);
	const [isAddSupplierModelOpen, setIsAddSupplierModelOpen] = useState(false);
	const [message, setMessage] = useState('');

	const [product, setProduct] = useState({
		name: '',
		price: 0,
		image_url: '',
		category_id: '',
		supplier_id: '',
	});

	const [category, setCategory] = useState({
		name: '',
	});

	const [supplier, setSupplier] = useState({
		name: '',
	});

	const [isEditMode, setIsEditMode] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [user, setUser] = useState({});
	useEffect(() => {
			const storedUser = localStorage.getItem('user');
			if (storedUser) {
				const user = JSON.parse(storedUser);
				setUser(user);
			}
		}, []);


	const handleSignOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/admin/login');
	};

	const handleEdit = (productId) => {
		if (!product.name || !product.price || !product.image_url || !product.category_id || !product.supplier_id) {
			setMessage('Please fill in all fields.');
			return;
		}
		try {
			fetch(`http://localhost:5000/api/products/products/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						console.log('Product updated successfully:', data);
						setMessage('Product updated successfully!');
						setIsAddProductModelOpen(false);
						refresh();
					} else {
						console.error('Error updating product:', data);
					}
				})
				.catch((error) => {
					console.error('Error updating product:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	};

	const handleDelete = (productId) => {
		try {
			fetch(`http://localhost:5000/api/products/products/${productId}`, {
				method: 'DELETE',
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						console.log('Product deleted successfully:', data);
						setMessage('Product deleted successfully!');
						refresh();
					} else {
						console.error('Error deleting product:', data);
					}
				})
				.catch((error) => {
					console.error('Error deleting product:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	};

	const handleAddProduct = () => {
		if (!product.name || !product.price || !product.image_url || !product.category_id || !product.supplier_id) {
			setMessage('Please fill in all fields.');
			return;
		}

		if (product.price < 0) {
			setMessage('Price cannot be negative.');
			return;
		}
		try {
			fetch('http://localhost:5000/api/products/products', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(product),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						console.log('Product added successfully:', data);
						setMessage('Product added successfully!');
						setIsAddProductModelOpen(false);
						refresh();
					} else {
						console.error('Error adding product:', data);
					}
				})
				.catch((error) => {
					console.error('Error adding product:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	};

	const handleAddCategory = () => {
		if (!category.name) {
			setMessage('Please fill in all fields.');
			return;
		}
		try {
			fetch('http://localhost:5000/api/categories/categories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(category),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Response data:', data);
					if (data) {
						console.log('Category added successfully:', data);
						setMessage('Category added successfully!');
						setIsAddCategoryModelOpen(false);
						refresh();
					} else {
						console.error('Error adding category:', data);
					}
				})
				.catch((error) => {
					console.error('Error adding category:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	};

	const handleAddSupplier = () => {
		if (!supplier.name) {
			setMessage('Please fill in all fields.');
			return;
		}
		try {
			fetch('http://localhost:5000/api/suppliers/suppliers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(supplier),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						console.log('Supplier added successfully:', data);
						setMessage('Supplier added successfully!');
						setIsAddSupplierModelOpen(false);
						refresh();
					} else {
						console.error('Error adding supplier:', data);
					}
				})
				.catch((error) => {
					console.error('Error adding supplier:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	};

	const handleRestore = (productId) => {
		try {
			fetch(`http://localhost:5000/api/products/products/restore/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ is_deleted: false }),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data) {
						console.log('Product restored successfully:', data);
						setMessage('Product restored successfully!');
						refresh();
					} else {
						console.error('Error restoring product:', data);
					}
				})
				.catch((error) => {
					console.error('Error restoring product:', error);
				});
		}
		catch (error) {
			console.error('Error:', error);
		}
	}

	if (user.role !== 'admin') {
		return (
			<div className="products-container">
				<h1>Unauthorized Access</h1>
				<p>You do not have permission to access this page.</p>
				<button onClick={() => navigate('/admin/login')}>Go to Login</button>
			</div>
		)
	}


	return (
		<div className="products-container">
			<header className="products-header">
				<nav>
					<button onClick={() => navigate('/admin/orders')}>Orders</button>
					<button onClick={() => navigate('/products')} className='clicked'>Products</button>
				</nav>
				<div className="products-welcome">
					<span>Welcome, {user && user.name}</span>
					<button onClick={handleSignOut}>Sign Out</button>
				</div>
			</header>

			<h1>Product Management</h1>

			<div className="add-buttons">
				<div className="add-product-wrapper">
					<button className="add-product-btn" onClick={() => {
						setProduct({
							name: '',
							price: 0,
							image_url: '',
							category_id: '',
							supplier_id: '',
						});
						setIsEditMode(false);
						setIsAddProductModelOpen(true);
					}}>
						Add Product
					</button>
				</div>

				<div className="add-category-wrapper">
					<button className="add-category-btn" 
						onClick={() => {
							setCategory({
								name: '',
							});
							setIsAddCategoryModelOpen(true);
						}}
					>Add Category</button>
				</div>

				<div className="add-supplier-wrapper">
					<button className="add-supplier-btn" 
						onClick={() => {
							setSupplier({
								name: '',
							});
							setIsAddSupplierModelOpen(true);
						}}
					>Add Supplier</button>
				</div>
			</div>

			{isAddProductModelOpen && (
				<AddProductModel
					product={product}
					setProduct={setProduct}
					onSubmit={isEditMode ? () => handleEdit(product._id) : handleAddProduct}
					onClose={() => setIsAddProductModelOpen(false)}
					mode={isEditMode ? 'Edit' : 'Add'}
				/>
			)}

			{showConfirm && (
				<YesNoModel
					message={product.is_deleted ? 'Are you sure you want to restore this product?' : 'Are you sure you want to delete this product?'}
					onYes={() => {
						if (!product.is_deleted) {
							handleDelete(product._id);
						} else {
							handleRestore(product._id);
						}
						setShowConfirm(false);
					}}
					onNo={() => setShowConfirm(false)}
				/>
			)}

			{
				isAddCategoryModelOpen && (
					<CategoryModel 
						category={category}
						setCategory={setCategory}
						onSubmit={handleAddCategory}
						onClose={() => setIsAddCategoryModelOpen(false)}
					/>
				)
			}

			{
				isAddSupplierModelOpen && (
					<SupplierModel 
						supplier={supplier}
						setSupplier={setSupplier}
						onSubmit={handleAddSupplier}
						onClose={() => setIsAddSupplierModelOpen(false)}
					/>
				)
			}

			{
				!loading && products.length > 0 ? (
					<table className="products-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Image</th>
								<th>Name</th>
								<th>Price (TL)</th>
								<th>Category</th>
								<th>Supplier</th>
								<th>Is Deleted</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product,index) => (
								<tr key={product._id}>
									<td>{index+1}</td>
									<td>
										<img src={product.image_url} alt={product.name} width="60" height="60" />
									</td>
									<td>{product.name}</td>
									<td>{product.price.toFixed(2)}</td>
									<td>{product.category_id.name}</td>
									<td>{product.supplier_id.name}</td>
									<td>{product.is_deleted ? 'Yes' : 'No'}</td>
									<td>
										<button onClick={() => {
											setProduct(product);
											console.log(product);
											setIsEditMode(true);
											setIsAddProductModelOpen(true);
										}}>Edit</button>
										<button onClick={() => {
											setProduct(product);
											setShowConfirm(true);
										}
										}>
											{product.is_deleted ? 'Restore' : 'Delete'}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No products available.</p>
				)
			}

			{loading && <LoadingModel />}
			{
				message && (
					<MessageModel
						message={message}
						onClose={() => setMessage('')}
					/>
				)
			}
		</div>
	);
}

export default Products;
