import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InboxIcon from '@mui/icons-material/Inbox';
import axios from "axios";
import { API_URL } from "../../../../const/api_url";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { useSnackbar } from "notistack";

const ItemGrid = (props) => {
    const { handleEditItem, handleVisibility, items, setRefetchFlag } = props;
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteItem = async () => {
        try {
            await axios.delete(`${API_URL}/image/delete/${deleteItemId}`);
            setRefetchFlag(true); // Trigger refetch after deletion
            closeDeleteDialog();
            enqueueSnackbar('Item deleted successfully', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Error deleting item', { variant: 'error' });
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        handleEditItem(item);
        handleVisibility(true);
    };

    const openDeleteDialog = (item) => {
        setDeleteItemId(item._id);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeleteItemId(null);
    };

    return (
        <Box p={3} sx={{ overflowY: 'scroll', maxHeight: '50vh', paddingTop: '11%', position: 'fixed', width: '95.5vw', bgcolor: 'rgba(255,255,255,0.8)', borderRadius: '10px', paddingBottom: '5%' }}>
            {items.length !== 0 ? (
                <Grid container spacing={3} justifyContent="start">
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    bgcolor: 'background.paper',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    border: '1px solid #1c1c1c',
                                    p: 2,
                                    maxHeight: '510px',
                                    minHeight: '510px',
                                }}
                            >
                                <Box sx={{ mb: 2, maxHeight: '200px', minHeight: '200px' }}>
                                    <img
                                        src={item.image_url}
                                        alt={`Item ${index}`}
                                        width="100%"
                                        height="200px"
                                        style={{
                                            borderRadius: 8,
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ textAlign: 'start', width: '100%' }}>
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Eye Count:</strong> {item.eye_count}
                                    </Typography>
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Print Style:</strong> {item.print_style}
                                    </Typography>
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Size:</strong> {item.size}
                                    </Typography>
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Frame:</strong> {item.frame}
                                    </Typography>
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Effect:</strong> {item.effect}
                                    </Typography>
                                    {item.duo_custom_effects && (
                                        <Typography variant="body1" mb={1} component="div">
                                            <strong>Duo Custom Effect:</strong> {item.duo_custom_effects}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" mb={1} component="div">
                                        <strong>Price:</strong> Rs.{item.price}.00
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <div style={{ border: '1px solid #1c1c1c', borderRadius: '5px', padding: '5px' }}>
                                        <IconButton color="primary" onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                    <div style={{ border: '1px solid #1c1c1c', borderRadius: '5px', padding: '5px', marginLeft: '15px' }}>
                                        <IconButton color="error" onClick={() => openDeleteDialog(item)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} sx={{  minHeight: '50vh',width:'100%', paddingTop: '11%' , bgcolor: 'rgba(255,255,255,0.8)', paddingBottom: '5%' }}>
                    <InboxIcon fontSize="large" color="disabled" />
                    <Typography variant="h6" color="textSecondary">
                        No items found
                    </Typography>
                </Box>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this item?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteItem} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ItemGrid;
