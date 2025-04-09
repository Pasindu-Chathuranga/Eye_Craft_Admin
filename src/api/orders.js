import { API_URL } from "../const/api_url";

 
// Function to fetch orders
export const getOrders = async () => {
    try {
        const response = await fetch(`${API_URL}/order/get`);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        return data; // Assuming the API returns an array of orders
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching orders');
    }
};

// Function to delete an order by ID
export const deleteOrder = async (orderId) => {
    try {
        const response = await fetch(`${API_URL}/order/delete/${orderId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        return true; // Return success if order was deleted
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting order');
    }
};

// Function to add a new order
export const addOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/order/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Failed to add order');
        }
        const data = await response.json();
        return data; // Return the newly created order
    } catch (error) {
        console.error(error);
        throw new Error('Error adding order');
    }
};

// Function to update an existing order
export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await fetch(`${API_URL}/order/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
        const data = await response.json();
        getOrders()
        return data; // Return the updated order
    } catch (error) {
        console.error(error);
        throw new Error('Error updating order');
    }
};
