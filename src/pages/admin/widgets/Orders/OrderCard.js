import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Card, CardContent, CardMedia, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderActions from './OrderActions';

const OrderCard = ({ order, setNotification }) => {
    return (
        <Accordion sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: '#f9f9f9', mb: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#e0e0e0', borderRadius: '8px 8px 0 0', padding: '10px 20px' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#4a4a4a' }}>Order ID: {order._id}</Typography>
                <Typography variant="body2" sx={{ marginLeft: 'auto', color: '#757575', fontWeight: 'bold' }}>{order.order_status}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 2 }}>
                <Card sx={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', boxShadow: 1, borderRadius: 2 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, objectFit: 'contain', margin: 2, borderRadius: 1 }}
                        image={order.image_url}
                        alt="Order Item"
                    />
                    <CardContent sx={{ flex: 1, padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* Order Details (Center) */}
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Order Details</Typography>
                                <Divider sx={{ my: 1, bgcolor: '#bd80f8' }} />
                                <Typography variant="body2">Status: {order.order_status}</Typography>
                                <Typography variant="body2">Effect: {order.effect}</Typography>
                                <Typography variant="body2">Eye Count: {order.eye_count}</Typography>
                                <Typography variant="body2">Frame: {order.frame}</Typography>
                                <Typography variant="body2">Print Style: {order.print_style}</Typography>
                                <Typography variant="body2">Size: {order.size}</Typography>
                            </Grid>

                            {/* Customer Details (Right) */}
                            <Grid item xs={4}>
                                <Typography variant="body1" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Customer Details</Typography>
                                <Divider sx={{ my: 1, bgcolor: '#bd80f8' }} />
                                <Typography variant="body2">Name: {order.customer_name}</Typography>
                                <Typography variant="body2">Address: {order.customer_address}, {order.customer_city}</Typography>
                                <Typography variant="body2">Email: {order.customer_email}</Typography>
                                <Typography variant="body2">Phone: {order.customer_phone}</Typography>
                            </Grid>

                            {/* Price and Actions (Bottom Right) */}
                            <Grid item xs={4} display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold" sx={{ color: '#6d6d6d' }}>Price: ${order.price}</Typography>
                                <OrderActions order={order} setNotification={setNotification} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>
    );
}

export default OrderCard;
