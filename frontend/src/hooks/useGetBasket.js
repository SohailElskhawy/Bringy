import {useState, useEffect} from 'react';
function useGetBasket(customerId) {
    const [basket, setBasket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/basket/basket/${customerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch basket');
                }
                const data = await response.json();
                setBasket(data);
            } catch (error) {
                console.error('Error fetching basket:', error);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchBasket();
        }
    })

return { basket, loading };
}

export default useGetBasket;