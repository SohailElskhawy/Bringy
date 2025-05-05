import { useEffect, useState } from 'react';

function useProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		setLoading(true);
		try {
			const [productsRes] = await Promise.all([
				fetch('http://localhost:5000/api/products/products')
			]);
			const productsData = await productsRes.json();
			setProducts(productsData);
		} catch (err) {
			console.error('Failed to fetch data', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);


	return {
		products,
		loading,
		refresh: fetchData
	};
}

export default useProducts;
