import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const OrderActions = ({ order, isEdit, setNotification, onDelete, onSave }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState('');

    const handleDelete = () => {
        onDelete(order._id)
        setNotification({ open: true, message: 'Order deleted' });
    };

    const handleStatusUpdate = (newStatus) => {
        setAction(newStatus); 
        setOpenDialog(true);
    };

    const confirmStatusUpdate = () => {
        setOpenDialog(false);
        onSave(order._id, { ...order, order_status: action });
        setNotification({ open: true, message: `Status updated to ${action}` });
        // Additional status update logic can go here
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setAction('');
    };

    return (
        <div>
            <Grid container flexDirection='row' spacing={2}>
                {/* Order Details (Center) */}
                <Grid item xs={8}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                        <Tooltip title="Mark as Completed">
                            <Button startIcon={<DoneIcon />} variant='outlined' onClick={() => handleStatusUpdate('completed')} sx={{ color: 'green', width: '100%', marginTop: '5px', marginRight: '5px' }}>
                                Mark as Completed
                            </Button>
                        </Tooltip>
                        <Tooltip title="Mark as Canceled">
                            <Button startIcon={<CloseIcon />} variant='outlined' onClick={() => handleStatusUpdate('canceled')} sx={{ color: 'red', width: '100%', marginTop: '5px', marginRight: '5px' }}>
                                Mark as Canceled
                            </Button>
                        </Tooltip>
                        <Tooltip title="Mark as Processing">
                            <Button startIcon={<HourglassBottomIcon />} variant='outlined' onClick={() => handleStatusUpdate('processing')} sx={{ color: 'orange', width: '100%', marginTop: '5px', marginRight: '5px' }}>
                                Mark as Processing
                            </Button>
                        </Tooltip>
                        <Tooltip title="Mark as Pending">
                            <Button startIcon={<PendingActionsIcon />} variant='outlined' onClick={() => handleStatusUpdate('pending')} sx={{ color: 'blue', width: '100%', marginTop: '5px' }}>
                                Mark as Pending
                            </Button>
                        </Tooltip>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                        <Tooltip title="Edit">
                            <Button startIcon={<EditIcon />} variant='outlined' onClick={() => isEdit(true)} color="primary" sx={{ width: '100%', marginTop: '5px', marginRight: '5px', marginLeft: '50px' }}>
                                Edit Order
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button startIcon={<DeleteIcon />} variant='outlined' onClick={handleDelete} color="error" sx={{ width: '100%', marginTop: '5px' }}>
                                Delete Order
                            </Button>
                        </Tooltip>
                    </div>
                </Grid>
            </Grid>



            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update the order status to "{action}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">Cancel</Button>
                    <Button onClick={confirmStatusUpdate} color="secondary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderActions;
