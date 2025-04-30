import { useState } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';
import AddProductModel from '../../components/AddProductModel/AddProductModel';
import YesNoModel from '../../components/YesNoModel/YesNoModel';
import useProducts from '../../hooks/useProducts';
import LoadingModel from '../../components/LoadingModel/LoadingModel';
import CategoryModel from '../../components/CategoryModel/CategoryModel';
import SupplierModel from '../../components/SupplierModel/SupplierModel';


function Products() {
	const { products, loading, getCategoryName, getSupplierName, refresh } = useProducts();

	const [username] = useState('Admin');
	const navigate = useNavigate();
	const [isAddProductModelOpen, setIsAddProductModelOpen] = useState(false);
	const [isAddCategoryModelOpen, setIsAddCategoryModelOpen] = useState(false);
	const [isAddSupplierModelOpen, setIsAddSupplierModelOpen] = useState(false);


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

	const handleSignOut = () => {
		navigate('/admin/login');
	};

	const handleEdit = (productId) => {
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
					if (data.success) {
						console.log('Product updated successfully:', data.product);
						setIsAddProductModelOpen(false);
						refresh();
					} else {
						console.error('Error updating product:', data.message);
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
					if (data.success) {
						console.log('Product deleted successfully:', data.product);
						refresh();
					} else {
						console.error('Error deleting product:', data.message);
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
					if (data.success) {
						console.log('Product added successfully:', data.product);
						setIsAddProductModelOpen(false);
						refresh();
					} else {
						console.error('Error adding product:', data.message);
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
					if (data.success) {
						console.log('Category added successfully:', data.category);
						setIsAddCategoryModelOpen(false);
						refresh();
					} else {
						console.error('Error adding category:', data.message);
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
					if (data.success) {
						console.log('Supplier added successfully:', data.supplier);
						setIsAddSupplierModelOpen(false);
						refresh();
					} else {
						console.error('Error adding supplier:', data.message);
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

	return (
		<div className="products-container">
			<header className="products-header">
				<nav>
					<button onClick={() => navigate('/admin/orders')}>Orders</button>
					<button onClick={() => navigate('/products')}>Products</button>
				</nav>
				<div className="products-welcome">
					<span>Welcome, {username}</span>
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
					onSubmit={isEditMode ? handleEdit : handleAddProduct}
					onClose={() => setIsAddProductModelOpen(false)}
					mode={isEditMode ? 'Edit' : 'Add'}
				/>
			)}

			{showConfirm && (
				<YesNoModel
					message="Are you sure you want to delete this product?"
					onYes={() => {
						handleDelete(product.id);
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
								<th>Price ($)</th>
								<th>Category</th>
								<th>Supplier</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>
										<img src={product.image_url} alt={product.name} width="60" height="60" />
									</td>
									<td>{product.name}</td>
									<td>{product.price.toFixed(2)}</td>
									<td>{getCategoryName(product.category_id)}</td>
									<td>{getSupplierName(product.supplier_id)}</td>
									<td>
										<button onClick={() => {
											setProduct(product);
											setIsEditMode(true);
											setIsAddProductModelOpen(true);
										}}>Edit</button>
										<button onClick={() => {
											setProduct(product);
											setShowConfirm(true);
										}
										}>Delete</button>
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
		</div>
	);
}

export default Products;
