import {useState, useEffect} from 'react';


function useSuppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/suppliers/suppliers');
                const data = await response.json();
                console.log('Suppliers data:', data);
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    return { suppliers, loading };
}

export default useSuppliers;