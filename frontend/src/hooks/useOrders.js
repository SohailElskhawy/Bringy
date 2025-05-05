import {useEffect, useState} from 'react';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/orders/orders');
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {orders, loading, refresh: fetchOrders};
}

export default useOrders;