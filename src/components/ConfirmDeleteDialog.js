import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ConfirmDeleteDialog = ({ open, handleClose, handleConfirm, orderId }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#152f48', color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon />
                Confirm Delete
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete order <strong>#{orderId}</strong>? This action cannot be undone.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} sx={{ backgroundColor: '#152f48', color: 'white' }}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
