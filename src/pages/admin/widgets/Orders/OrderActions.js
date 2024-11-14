import React, { useState } from 'react';
import { IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const OrderActions = ({ order, setNotification }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [action, setAction] = useState('');

    const handleDelete = () => {
        // Implement delete logic
        setNotification({ open: true, message: 'Order deleted' });
    };

    const handleStatusUpdate = (newStatus) => {
        setAction(newStatus);
        setOpenDialog(true);
    };

    const confirmStatusUpdate = () => {
        setOpenDialog(false);
        setNotification({ open: true, message: `Status updated to ${action}` });
        // Additional status update logic can go here
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setAction('');
    };

    return (
        <div>
            <Tooltip title="Edit">
                <IconButton onClick={() => { /* handle edit */ }} color="primary">
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={handleDelete} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark as Completed">
                <IconButton onClick={() => handleStatusUpdate('completed')} sx={{ color: 'green' }}>
                    <DoneIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark as Canceled">
                <IconButton onClick={() => handleStatusUpdate('canceled')} sx={{ color: 'red' }}>
                    <CloseIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark as Processing">
                <IconButton onClick={() => handleStatusUpdate('processing')} sx={{ color: 'orange' }}>
                    <HourglassBottomIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark as Pending">
                <IconButton onClick={() => handleStatusUpdate('pending')} sx={{ color: 'blue' }}>
                    <PendingActionsIcon />
                </IconButton>
            </Tooltip>

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
