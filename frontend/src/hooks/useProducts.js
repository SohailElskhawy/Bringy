import { useEffect, useState } from 'react';

function useProducts(category = '', sortOrder = '', search = '') {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchFilteredProducts = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			if (category) params.append('category_id', category);
			if (sortOrder) params.append('sort', sortOrder);
			if (search) params.append('search', search);

			const res = await fetch(`http://localhost:5000/api/products/products/filter?${params.toString()}`);
			const productsData = await res.json();
			setProducts(productsData);
		} catch (err) {
			console.error('Failed to fetch data', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFilteredProducts();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category, sortOrder, search]);

	return {
		products,
		loading,
		refresh: fetchFilteredProducts
	};
}

export default useProducts;
