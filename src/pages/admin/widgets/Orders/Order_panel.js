import React, { useState, useEffect } from 'react';
import {
    Paper,
    IconButton,
    Snackbar,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box
} from '@mui/material';
import {MaterialReactTable} from 'material-react-table';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import { API_URL } from '../../../../const/api_url';
import axios from 'axios';

const OrdersPanel = () => {
    const [orders, setOrders] = useState([]);
    const [notification, setNotification] = useState({ open: false, message: '' });
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [viewOrder, setViewOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/get`);
            const fetchedOrders = response.data.map(order => ({
                id: order._id,
                createdAt: new Date(order.createdAt).toLocaleString(),
                updatedAt: new Date(order.updatedAt).toLocaleString(),
                ...order.order,
                ...order.customer
            }));
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
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

    const columns = [
        { accessorKey: 'name', header: 'Customer Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'contact', header: 'Contact' },
        { accessorKey: 'address', header: 'Address' },
        { accessorKey: 'Eye_Count', header: 'Eye Count' },
        { accessorKey: 'Print_Style', header: 'Print Style' },
        { accessorKey: 'Sizes', header: 'Sizes' },
        { accessorKey: 'Effects', header: 'Effects' },
        { accessorKey: 'Frames', header: 'Frames' },
        { accessorKey: 'createdAt', header: 'Created At' },
        { accessorKey: 'updatedAt', header: 'Updated At' },
    ];

    return (
        <Paper sx={{ m: 2, p: 2 }}>
            <MaterialReactTable
                columns={columns}
                data={orders}
                enableColumnFilters
                enableSorting
                enableTopToolbar
                localization={MRT_Localization_EN}
                renderTopToolbarCustomActions={() => (
                    <Tooltip title="Add New Order">
                        <IconButton>
                            <Add color="primary" />
                        </IconButton>
                    </Tooltip>
                )}
                renderRowActions={({ row }) => (
                    <Box>
                        <Tooltip title="View Order">
                            <IconButton onClick={() => {
                                setViewOrder(row.original);
                                setViewDialogOpen(true);
                            }}>
                                <Visibility color="action" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Order">
                            <IconButton>
                                <Edit color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                            <IconButton onClick={() => onDelete(row.original.id)}>
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            />

            <Snackbar
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />

            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {viewOrder && Object.entries(viewOrder).map(([key, value]) => (
                        <Typography key={key}><strong>{key}:</strong> {value}</Typography>
                    ))}
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default OrdersPanel;