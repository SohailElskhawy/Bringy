import { useEffect, useState } from 'react';

function useProducts() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
				fetch('http://localhost:5000/api/products/products'),
				fetch('http://localhost:5000/api/categories/categories'),
				fetch('http://localhost:5000/api/suppliers/suppliers'),
			]);

			const productsData = await productsRes.json();
			const categoriesData = await categoriesRes.json();
			const suppliersData = await suppliersRes.json();

			if (productsData.success && categoriesData.success && suppliersData.success) {
				setProducts(productsData.products);
				setCategories(categoriesData.categories);
				setSuppliers(suppliersData.suppliers);
			}
		} catch (err) {
			console.error('Failed to fetch data', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const getCategoryName = (categoryId) => {
		const category = categories.find((cat) => cat._id === categoryId);
		return category ? category.name : 'Unknown';
	};

	const getSupplierName = (supplierId) => {
		const supplier = suppliers.find((sup) => sup._id === supplierId);
		return supplier ? supplier.name : 'Unknown';
	};

	return {
		products,
		loading,
		getCategoryName,
		getSupplierName,
		refresh: fetchData,
	};
}

export default useProducts;
