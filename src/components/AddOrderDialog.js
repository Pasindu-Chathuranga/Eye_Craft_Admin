import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, MenuItem, Grid, Divider, Stack,
    Typography, Box
} from '@mui/material';
import CustomImage from './CustomeImage';

const eyeCountOptions = ['Single iris - One person', 'Duo iris - Two people', 'Trio iris - Three people', 'Quadruple iris - Four people'];
const printStyleOptions = ['Paper-based print'];
const sizeOptions = ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm'];
const effectsOptions = ['Pure effect', 'Explosion effect', 'Halo effect', 'Dust effect'];
const duoEffectsOptions = ['Yin Yang effect', 'Infinity effect', 'Fusion effect', 'Pure effect', 'Explosion effect', 'Halo effect'];

const frameOptions = ['Professional frame picture', 'Standard frame picture'];

const AddOrderDialog = ({ open, handleClose, handleSave }) => {
    const [orderData, setOrderData] = useState({
        customer: { name: '', address: '', contact: '', email: '' },
        order: { Eye_Count: '', Print_Style: '', Sizes: '', Effects: '', Frames: '', Status: '' }
    });

    const [errors, setErrors] = useState({});

    const validateField = (name, value, group = 'customer') => {
        const isEmpty = !value.trim();
        setErrors(prev => ({
            ...prev,
            [`${group}.${name}`]: isEmpty ? 'This field is required' : ''
        }));
    };

    const validateAll = () => {
        const newErrors = {};
        Object.entries(orderData.customer).forEach(([key, val]) => {
            if (!val.trim()) newErrors[`customer.${key}`] = 'This field is required';
        });
        Object.entries(orderData.order).forEach(([key, val]) => {
            if (!val.trim()) newErrors[`order.${key}`] = 'This field is required';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({
            ...prev,
            customer: { ...prev.customer, [name]: value }
        }));
        validateField(name, value, 'customer');
    };

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({
            ...prev,
            order: { ...prev.order, [name]: value }
        }));
        validateField(name, value, 'order');
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setOrderData(prev => ({
            ...prev,
            order: { ...prev.order, Status: value }
        }));
        validateField('Status', value, 'order');
    };

    const onSave = () => {
        if (!validateAll()) return;
        handleSave(orderData);
        setOrderData({
            customer: { name: '', address: '', contact: '', email: '' },
            order: { Eye_Count: '', Print_Style: '', Sizes: '', Effects: '', Frames: '', Status: '' }
        });
        setErrors({});
    };

    // Determine the available frame options based on selected size
    const availableFrameOptions = orderData.order.Sizes === '20cmx20cm'
        ? ['Standard frame picture']
        : orderData.order.Sizes === '50cmx50cm'
            ? ['Professional frame picture']
            : frameOptions;

    const dynamicEffects = orderData.order.Eye_Count === 'Duo iris - Two people'
        ? duoEffectsOptions
        : effectsOptions;

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#152f48', color: 'white' }}>
                Add New Order
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ width: '350px', ml: 2 }}>
                            <CustomImage
                                eyeCount={orderData.order.Eye_Count}
                                frame={orderData.order.Frames}
                                size={orderData.order.Sizes}
                                effect={orderData.order.Effects}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1" fontWeight="bold">Customer Info</Typography>
                            {['name', 'address', 'contact', 'email'].map((field) => (
                                <TextField
                                    key={field}
                                    label={`Customer ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                    name={field}
                                    fullWidth
                                    value={orderData.customer[field]}
                                    onChange={handleCustomerChange}
                                    error={!!errors[`customer.${field}`]}
                                    helperText={errors[`customer.${field}`]}
                                />
                            ))}

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Order Info</Typography>
                            {[{
                                name: 'Eye_Count', label: 'Person Count', options: eyeCountOptions
                            }, {
                                name: 'Print_Style', label: 'Print Style', options: printStyleOptions
                            }, {
                                name: 'Sizes', label: 'Size', options: sizeOptions
                            }, {
                                name: 'Effects', label: 'Effect', options: dynamicEffects
                            }, {
                                name: 'Frames', label: 'Frame Type', options: availableFrameOptions
                            }].map(({ name, label, options }) => (
                                <TextField
                                    key={name}
                                    select
                                    fullWidth
                                    name={name}
                                    label={label}
                                    value={orderData.order[name]}
                                    onChange={handleOrderChange}
                                    error={!!errors[`order.${name}`]}
                                    helperText={errors[`order.${name}`]}
                                >
                                    {options.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ))}

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Order Status</Typography>
                            <TextField
                                select
                                fullWidth
                                name="Status"
                                label="Status"
                                value={orderData.order.Status}
                                onChange={handleStatusChange}
                                error={!!errors['order.Status']}
                                helperText={errors['order.Status']}
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
                <Button onClick={onSave} sx={{ backgroundColor: '#152f48', color: 'white' }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrderDialog;
