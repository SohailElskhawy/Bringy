export const getUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        if(data){
            localStorage.setItem('user', JSON.stringify(data));
        }
        

        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}