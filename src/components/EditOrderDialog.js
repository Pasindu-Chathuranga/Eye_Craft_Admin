import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, MenuItem, TextField, Stack, Grid, Box,
    Typography,
    Divider
} from '@mui/material';
import CustomImage from './CustomeImage';

const EditOrderDialog = ({ open, handleClose, order, handleUpdate }) => {
    const [updatedOrder, setUpdatedOrder] = useState({
        customer: {
            name: '',
            email: '',
            contact: '',
            address: '',
        },
        order: {
            Eye_Count: '',
            Print_Style: '',
            Sizes: '',
            Effects: '',
            Frames: '',
            status: '', // New field for order status
        }
    });

    useEffect(() => {
        if (order) {
            setUpdatedOrder({
                customer: order.customer || {
                    name: '', email: '', contact: '', address: ''
                },
                order: {
                    ...order.order,
                    Status: order.order.Status || '', // Set status from order if available
                }
            });
        }
    }, [order]);

    const handleChange = (e, path) => {
        const { name, value } = e.target;

        if (typeof path === 'string') {
            const [parentKey, childKey] = path.split('.');
            setUpdatedOrder(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: value
                }
            }));
        } else {
            setUpdatedOrder(prev => ({
                ...prev,
                order: {
                    ...prev.order,
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = () => {
        handleUpdate(order._id, updatedOrder);
        handleClose();
    };

    if (!order) return null;

    // Conditionally set the available frames based on the selected size
    const availableFrames = updatedOrder.order.Sizes === '20cmx20cm'
        ? ['Standard frame picture']
        : updatedOrder.order.Sizes === '50cmx50cm'
            ? ['Professional frame picture']
            : [
                'Professional frame picture',
                'Standard frame picture'
            ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#152f48', color: 'white' }}>
                Edit Order - #{order._id || 'N/A'}
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Left Side: Image */}
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ width: '350px', ml: 2 }}>
                            <CustomImage
                                eyeCount={updatedOrder.order.Eye_Count}
                                frame={updatedOrder.order.Frames}
                                size={updatedOrder.order.Sizes}
                                effect={updatedOrder.order.Effects}
                                duoEffect={updatedOrder.order.Duo_Irish_effect}
                            />
                        </Box>
                    </Grid>

                    {/* Right Side: Form */}
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Customer Info</Typography>
                            <TextField
                                label="Customer Name"
                                name="name"
                                value={updatedOrder.customer.name}
                                onChange={(e) => handleChange(e, 'customer.name')}
                                fullWidth
                            />
                            <TextField
                                label="Customer Email"
                                name="email"
                                value={updatedOrder.customer.email}
                                onChange={(e) => handleChange(e, 'customer.email')}
                                fullWidth
                            />
                            <TextField
                                label="Customer Contact"
                                name="contact"
                                value={updatedOrder.customer.contact}
                                onChange={(e) => handleChange(e, 'customer.contact')}
                                fullWidth
                            />
                            <TextField
                                label="Customer Address"
                                name="address"
                                value={updatedOrder.customer.address}
                                onChange={(e) => handleChange(e, 'customer.address')}
                                fullWidth
                            />

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Order Info</Typography>
                            <TextField
                                label="Eye Count"
                                name="Eye_Count"
                                select
                                value={updatedOrder.order.Eye_Count}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Single iris">Single iris</MenuItem>
                                <MenuItem value="Duo iris">Duo iris</MenuItem>
                                <MenuItem value="Trio iris">Trio iris</MenuItem>
                                <MenuItem value="Quadruple iris">Quadruple iris</MenuItem>
                            </TextField>
                            <TextField
                                label="Print Style"
                                name="Print_Style"
                                select
                                value={updatedOrder.order.Print_Style}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Paper-based print">Paper-based print</MenuItem>
                            </TextField>
                            <TextField
                                label="Sizes"
                                name="Sizes"
                                select
                                value={updatedOrder.order.Sizes}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="20cmx20cm">20cmx20cm</MenuItem>
                                <MenuItem value="30cmx30cm">30cmx30cm</MenuItem>
                                <MenuItem value="40cmx40cm">40cmx40cm</MenuItem>
                                <MenuItem value="50cmx50cm">50cmx50cm</MenuItem>
                            </TextField>
                            <TextField
                                label="Effects"
                                name="Effects"
                                select
                                value={updatedOrder.order.Effects}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Pure effect">Pure effect</MenuItem>
                                <MenuItem value="Explosion effect">Explosion effect</MenuItem>
                                <MenuItem value="Halo effect">Halo effect</MenuItem>
                                <MenuItem value="Dust effect">Dust effect</MenuItem>
                            </TextField>
                            <TextField
                                label="Frames"
                                name="Frames"
                                select
                                value={updatedOrder.order.Frames}
                                onChange={handleChange}
                                fullWidth
                            >
                                {availableFrames.map((frame) => (
                                    <MenuItem key={frame} value={frame}>
                                        {frame}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Customer Status</Typography>
                            <TextField
                                label="Order Status"
                                name="Status"
                                select
                                value={updatedOrder.order.Status}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Processing">Processing</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                            </TextField>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} sx={{ backgroundColor: '#152f48', color: 'white' }}>
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOrderDialog;
