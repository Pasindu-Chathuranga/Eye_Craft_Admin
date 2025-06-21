import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Typography } from '@mui/material';
import { API_URL } from '../../../const/api_url';
import axios from 'axios';

const OrdersPanel = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/get`);
            // Flatten nested structure to match table format
            const formatted = response.data.map((order) => ({
                id: order._id,
                createdAt: new Date(order.createdAt).toLocaleDateString(),
                eyeCount: order.order.Eye_Count,
                printStyle: order.order.Print_Style,
                sizes: order.order.Sizes,
                effects: order.order.Effects,
                frames: order.order.Frames,
                customerName: order.customer.name,
                contact: order.customer.contact,
                address: order.customer.address,
                city: order.customer.city || 'N/A',
                email: order.customer.email,
            }));
            setOrders(formatted);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const columns = [
        { accessorKey: 'id', header: 'Order ID' },
        { accessorKey: 'createdAt', header: 'Date' },
        { accessorKey: 'eyeCount', header: 'Eye Count' },
        { accessorKey: 'printStyle', header: 'Print Style' },
        { accessorKey: 'sizes', header: 'Sizes' },
        { accessorKey: 'effects', header: 'Effects' },
        { accessorKey: 'frames', header: 'Frames' },
        { accessorKey: 'customerName', header: 'Customer Name' },
        { accessorKey: 'contact', header: 'Contact' },
        { accessorKey: 'address', header: 'Address' },
        { accessorKey: 'city', header: 'City' },
        { accessorKey: 'email', header: 'Email' },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>Orders</Typography>
            <MaterialReactTable
                columns={columns}
                data={orders}
                enableColumnFilters
                enableGlobalFilter
                enableSorting
                muiTableProps={{
                    sx: { borderRadius: 2, boxShadow: 1 }
                }}
            />
        </Box>
    );
};

export default OrdersPanel;
