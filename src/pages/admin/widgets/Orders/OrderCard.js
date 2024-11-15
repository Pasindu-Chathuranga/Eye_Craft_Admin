import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Card, CardContent, CardMedia, Divider, TextField, MenuItem, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderActions from './OrderActions';
import moment from 'moment/moment';

const OrderCard = ({ order, setNotification, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...order });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false); 
        onSave(order._id, formData); // Call parent save handler
        setNotification({ open: true, message: 'Order updated successfully!', severity: 'success' });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({ ...order }); // Reset to original data
    };

    const selectOptions = {
        eye_count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris', 'Quintuple iris'],
        print_style: ['Paper-based print', 'Acrylic Artwork'],
        size: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm', '60cmx60cm', '80cmx80cm', '100cmx100cm'],
        frame: ['Professional frame picture', 'Standard frame picture'],
        effect: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image', 'Splash Effect image'],
    };

    return (
        <Accordion sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#f9f9f9', mb: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#e0e0e0', borderRadius: '8px 8px 0 0', padding: '10px 20px' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4a4a4a' }}>
                    Order ID: {formData._id} | {moment(formData.createdAt).format('YYYY:MM:DD hh:mm a')}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: 'auto', color: '#757575', fontWeight: 'bold' }}>
                    {formData.order_status}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 2 }}>
                <Card sx={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, objectFit: 'contain', margin: 2, borderRadius: 1 }}
                        image={formData.image_url}
                        alt="Order Item"
                    />
                    <CardContent sx={{ flex: 1, padding: 2 }}>
                        <Grid container spacing={2} mb={3}>
                            {/* Order Details (Center) */}
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Order Details</Typography>
                                <Divider sx={{ my: 1, bgcolor: '#bd80f8' }} />
                                {isEditing ? (
                                    <>
                                        {Object.keys(selectOptions).map((field) => (
                                            <TextField
                                                key={field}
                                                select
                                                label={field.replace('_', ' ').toUpperCase()}
                                                value={formData[field]}
                                                onChange={(e) => handleInputChange(field, e.target.value)}
                                                fullWidth
                                                variant="standard"
                                                margin="normal"
                                            >
                                                {selectOptions[field].map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2">Status: {formData.order_status}</Typography>
                                        <Typography variant="body2">Effect: {formData.effect}</Typography>
                                        <Typography variant="body2">Eye Count: {formData.eye_count}</Typography>
                                        <Typography variant="body2">Frame: {formData.frame}</Typography>
                                        <Typography variant="body2">Print Style: {formData.print_style}</Typography>
                                        <Typography variant="body2">Size: {formData.size}</Typography>
                                    </>
                                )}
                            </Grid>

                            {/* Customer Details (Right) */}
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Customer Details</Typography>
                                <Divider sx={{ my: 1, bgcolor: '#bd80f8' }} />
                                {isEditing ? (
                                    <>
                                        <TextField
                                            label="Customer Name"
                                            value={formData.customer_name}
                                            onChange={(e) => handleInputChange('customer_name', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Customer Address"
                                            value={formData.customer_address}
                                            onChange={(e) => handleInputChange('customer_address', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Customer City"
                                            value={formData.customer_city}
                                            onChange={(e) => handleInputChange('customer_city', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Customer Email"
                                            value={formData.customer_email}
                                            onChange={(e) => handleInputChange('customer_email', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            margin="normal"
                                        />
                                        <TextField
                                            label="Customer Phone"
                                            value={formData.customer_phone}
                                            onChange={(e) => handleInputChange('customer_phone', e.target.value)}
                                            fullWidth
                                            variant="standard"
                                            margin="normal"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="body2">Name: {formData.customer_name}</Typography>
                                        <Typography variant="body2">Address: {formData.customer_address}, {formData.customer_city}</Typography>
                                        <Typography variant="body2">Email: {formData.customer_email}</Typography>
                                        <Typography variant="body2">Phone: {formData.customer_phone}</Typography>
                                    </>
                                )}
                            </Grid>

                            {/* Price and Actions (Bottom Right) */}
                            <Grid item xs={4} display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Price: ${formData.price}</Typography>

                            </Grid>
                        </Grid>
                        {!isEditing && (
                            <OrderActions order={formData} isEdit={setIsEditing} setNotification={setNotification} onDelete={onDelete} onSave={onSave} />
                        )}
                        {isEditing && (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2, mr: 5 }}>
                                    Save
                                </Button>
                                <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ mt: 1 }}>
                                    Cancel
                                </Button>
                            </div>

                        )}
                    </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>
    );
};

export default OrderCard;
