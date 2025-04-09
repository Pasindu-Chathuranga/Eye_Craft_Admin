import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Snackbar,
    Alert,
    Card,
    Box,
    Typography,
    CircularProgress,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { getOrders, deleteOrder, updateOrder, addOrder } from '../api/orders';
import AddOrderDialog from '../components/AddOrderDialog';
import EditOrderDialog from '../components/EditOrderDialog';
import ViewOrderDialog from '../components/ViewOrderDialog';
import Layout from '../components/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadAllOrdersPDF, downloadOrderRowPDF } from '../utils/pdfUtils'; // Import the PDF functions
import dayjs from 'dayjs';
import { MenuOpenSharp } from '@mui/icons-material';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [isAdding, setIsAdding] = useState(false); // Loader state for adding order
    const [isEditing, setIsEditing] = useState(false); // Loader state for editing order
    const [isDeleting, setIsDeleting] = useState(false); // Loader state for deleting order
    const [anchorEl, setAnchorEl] = useState(null); // For the dropdown menu
    const [selectedOrderId, setSelectedOrderId] = useState(null); // To store the selected order ID for actions

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            setAlertMessage('Error fetching orders!');
            setAlertType('error');
            setAlertOpen(true);
        }
    };

    const handleAddOrder = async (orderData) => {
        setIsAdding(true);
        try {
            await addOrder(orderData);
            setAlertMessage('Order added successfully!');
            setAlertType('success');
            fetchOrders();
        } catch (error) {
            setAlertMessage('Error adding order!');
            setAlertType('error');
        }
        setAlertOpen(true);
        setIsAdding(false);
        setOpenAddDialog(false);
    };

    const handleEditOrder = async (orderId, updatedOrder) => {
        setIsEditing(true);
        try {
            await updateOrder(orderId, updatedOrder);  
            setAlertMessage('Order updated successfully!');
            setAlertType('success');
            fetchOrders();
        } catch (error) {
            setAlertMessage('Error updating order!');
            setAlertType('error');
        }
        setAlertOpen(true);
        setIsEditing(false);
        setOpenEditDialog(false);
    };

    const handleDeleteOrder = async (orderId) => {
        setIsDeleting(true);
        try {
            await deleteOrder(orderId);
            setAlertMessage('Order deleted successfully!');
            setAlertType('success');
            fetchOrders();
        } catch (error) {
            setAlertMessage('Error deleting order!');
            setAlertType('error');
        }
        setAlertOpen(true);
        setIsDeleting(false);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setOpenViewDialog(true);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleMenuClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action) => {
        if (action === 'view') {
            const order = orders.find(order => order._id === selectedOrderId);
            handleViewOrder(order);
        } else if (action === 'edit') {
            const order = orders.find(order => order._id === selectedOrderId);
            setSelectedOrder(order);
            setOpenEditDialog(true);
        } else if (action === 'delete') {
            handleDeleteOrder(selectedOrderId);
        } else if (action === 'download') {
            const order = orders.find(order => order._id === selectedOrderId);
            downloadOrderRowPDF(order);
        }
        handleMenuClose();
    };

    const columns = [
        {
            header: 'Customer Name',
            accessorFn: row => row.customer?.name || '',
            id: 'customerName',
            size: 200, // You can adjust the size value here
            minWidth: 80, // Optionally set a minimum width
        },
        {
            header: 'Product Style',
            accessorFn: row => row.order?.Print_Style || '',
            id: 'productStyle',
        },
        {
            header: 'Size',
            accessorFn: row => row.order?.Sizes || '',
            id: 'size',
            size: 100, // You can adjust the size value here
            minWidth: 80, // Optionally set a minimum width
        },
        {
            header: 'Frame Type',
            accessorFn: row => row.order?.Frames || '',
            id: 'frameType',
        },
        {
            header: 'Effect',
            accessorFn: row => row.order?.Effects || '',
            id: 'effect',
        },
        {
            header: 'Status',
            accessorFn: row => row.order?.Status || 'Pending',
            id: 'status',
            size: 100, // You can adjust the size value here
            minWidth: 80, // Optionally set a minimum width
        },
        {
            header: 'Order Date',
            accessorFn: row => dayjs(row.createdAt).format('DD-MMM-YYYY'),
            id: 'createdDate',
        },
        {
            header: 'Actions',
            id: 'actions',
            size: 100, // You can adjust the size value here
            minWidth: 80, // Optionally set a minimum width
            Cell: ({ row }) => {
                const order = row.original;
                return (
                    <IconButton
                        size="small"
                        onClick={(event) => handleMenuClick(event, order._id)}
                        disabled={isDeleting || isEditing}
                    >
                        <MenuOpenSharp />
                    </IconButton>
                );
            },
        }
    ];

    return (
        <Layout>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, maxWidth: '80vw' } }}>
                <Card sx={{ p: 2 }}>
                    <Box sx={{ minHeight: '350px', overflowX: 'auto' }}>
                        <MaterialReactTable
                            columns={columns}
                            data={orders}
                            enableColumnResizing
                            enableColumnFilters
                            enableTopToolbar
                            muiTableContainerProps={{ sx: { minWidth: '100%' } }}
                            renderTopToolbarCustomActions={() => (
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    <Button
                                        onClick={() => setOpenAddDialog(true)}
                                        variant="contained"
                                        sx={{ backgroundColor: '#152f48' }}
                                        disabled={isAdding}
                                    >
                                        {isAdding ? <CircularProgress size={24} color="inherit" /> : 'Add New Order'}
                                    </Button>
                                    <Button
                                        onClick={() => downloadAllOrdersPDF(orders)}
                                        variant="contained"
                                        color="secondary"
                                        sx={{ backgroundColor: '#152f48' }}
                                    >
                                        <DownloadIcon sx={{ mr: 1 }} />
                                        Download All Orders
                                    </Button>
                                </Box>
                            )}
                        />
                    </Box>
                </Card>
            </Box>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertType}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <AddOrderDialog open={openAddDialog} handleClose={() => setOpenAddDialog(false)} handleSave={handleAddOrder} />
            <EditOrderDialog open={openEditDialog} handleClose={() => setOpenEditDialog(false)} handleUpdate={handleEditOrder} order={selectedOrder} />
            <ViewOrderDialog open={openViewDialog} handleClose={() => setOpenViewDialog(false)} orderDetails={selectedOrder} />

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleAction('view')}>View</MenuItem>
                <MenuItem onClick={() => handleAction('edit')}>Edit</MenuItem>
                <MenuItem onClick={() => handleAction('delete')}>Delete</MenuItem>
                <MenuItem onClick={() => handleAction('download')}>Download</MenuItem>
            </Menu>
        </Layout>
    );
};

export default OrderPage;
