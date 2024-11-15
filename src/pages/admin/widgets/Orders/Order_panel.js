import React, { useState, useEffect } from 'react';
import { IconButton, InputAdornment, TextField, Typography, Snackbar, Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import OrderCard from './OrderCard';
import OrderStatusFilter from './OrderStatusFilter';
import { API_URL } from '../../../../const/api_url';
import axios from 'axios';
import { Inbox } from '@mui/icons-material';

const OrdersPanel = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({ status: '', date: '' });
    const [notification, setNotification] = useState({ open: false, message: '' });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/get`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const filteredOrders = orders.filter(order =>
        (order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order._id.includes(searchTerm)) &&
        (!filter.status || order.order_status === filter.status) &&
        (!filter.date || new Date(order.createdAt).toLocaleDateString() == new Date(filter.date).toLocaleDateString() )
    );

    const onSave = async (orderId, updatedOrder) => {
        try {
            await axios.put(`${API_URL}/order/update/${orderId}`, updatedOrder);
            fetchOrders();
            setNotification({ open: true, message: 'Order updated successfully' });
        } catch (error) {
            console.error('Error updating order:', error);
            setNotification({ open: true, message: 'Error updating order' });
        }
    };

    const onDelete = async (orderId) => {
        try {
            await axios.delete(`${API_URL}/order/delete/${orderId}`);
            fetchOrders();
            setNotification({ open: true, message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            setNotification({ open: true, message: 'Error deleting order' });
        }
    };

    return (
        <Box sx={{ bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '10px ', width: '100%', position: 'relative', overflowY: 'scroll', maxHeight: '80vh', width: '97.1vw' }}>
            <Stack direction="row" py={5} spacing={2} alignItems="center" justifyContent='space-between' sx={{ zIndex: '999', position: 'fixed', padding: 2, mb: 3, borderRadius: '10px 10px 0 0', bgcolor: '#ffffff', borderBottom: '1px #1c1c1c solid', paddingBottom: '10px', width: '95.5vw' }}>
                <Typography variant="h5">Orders | showing {filteredOrders.length} / {orders.length}</Typography>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSearchTerm('')}>
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mr: 3, width: '300px' }}
                    />
                    <OrderStatusFilter filter={filter} setFilter={setFilter} />
                </div>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '5%' }}>
                {filteredOrders.length ? (
                    filteredOrders.map(order => (
                        <OrderCard key={order._id} order={order} setNotification={setNotification} onSave={onSave} onDelete={onDelete} />
                    ))
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} sx={{ minHeight: '30vh', width: '100%', paddingTop: '11%', bgcolor: 'rgba(255,255,255,0.8)', paddingBottom: '5%' }}>
                        <Inbox fontSize="large" color="disabled" />
                        <Typography variant="h6" color="textSecondary">
                            No items found
                        </Typography>
                    </Box>
                )}
            </Box>
            <Snackbar
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
}

export default OrdersPanel;
