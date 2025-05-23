import {useEffect, useState} from 'react';

const useCustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCustomerOrders = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/orders/orders/customer/${id}`);
            const data = await response.json();
            if (data) {
                setOrders(data);
            }
        } catch (err) {
            console.error('Failed to fetch customer orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            fetchCustomerOrders(user.id);
        }
    }, []);

    return {orders, loading, refresh: fetchCustomerOrders};
}

export default useCustomerOrders;