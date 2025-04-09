import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Typography, Button, Divider, Stack, Grid, Box
} from '@mui/material';
import { jsPDF } from 'jspdf';
import CustomImage from './CustomeImage';

const ViewOrderDialog = ({ open, handleClose, orderDetails }) => {
    if (!orderDetails) return null;

    const { customer = {}, order = {}, createdAt = {}, updatedAt = {}, image } = orderDetails;

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Order Details - #${orderDetails._id || 'N/A'}`, 14, 20);

        doc.setFontSize(12);
        doc.text('Customer Info', 14, 30);
        doc.text(`Name: ${customer.name || 'N/A'}`, 14, 40);
        doc.text(`Email: ${customer.email || 'N/A'}`, 14, 50);
        doc.text(`Phone: ${customer.contact || 'N/A'}`, 14, 60);
        doc.text(`Address: ${customer.address || 'N/A'}`, 14, 70);

        doc.setLineWidth(0.5);
        doc.line(14, 80, 200, 80);

        doc.text('Order Info', 14, 90);
        doc.text(`Eye Count: ${order.Eye_Count || 'N/A'}`, 14, 100);
        doc.text(`Print Style: ${order.Print_Style || 'N/A'}`, 14, 110);
        doc.text(`Size: ${order.Sizes || 'N/A'}`, 14, 120);
        doc.text(`Effect: ${order.Effects || 'N/A'}`, 14, 130);
        doc.text(`Frame: ${order.Frames || 'N/A'}`, 14, 140);

        doc.line(14, 150, 200, 150);
        doc.text(`Created At: ${orderDetails?.createdAt ? new Date(orderDetails?.createdAt).toLocaleString() : 'N/A'}`, 14, 160);
        doc.text(`Updated At: ${orderDetails?.updatedAt ? new Date(orderDetails?.updatedAt).toLocaleString() : 'N/A'}`, 14, 170);

        doc.save(`order_${orderDetails._id || 'N/A'}.pdf`);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#152f48', color: 'white' }}>
                Order Details - #{orderDetails._id || 'N/A'}
            </DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Left Side: Image */}
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ width: '350px', ml: 2 }}>
                            <CustomImage
                                eyeCount={order.Eye_Count}
                                frame={order.Frames}
                                size={order.Sizes}
                                effect={order.Effects}
                                duoEffect={order.Duo_Irish_effect}
                            />
                        </Box>
                    </Grid>

                    {/* Right Side: Form */}
                    <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1" fontWeight="bold">Customer Info</Typography>
                            <Typography>Name: {customer.name || 'N/A'}</Typography>
                            <Typography>Email: {customer.email || 'N/A'}</Typography>
                            <Typography>Phone: {customer.contact || 'N/A'}</Typography>
                            <Typography>Address: {customer.address || 'N/A'}</Typography>

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Order Info</Typography>
                            <Typography>Eye Count: {order.Eye_Count || 'N/A'}</Typography>
                            <Typography>Print Style: {order.Print_Style || 'N/A'}</Typography>
                            <Typography>Size: {order.Sizes || 'N/A'}</Typography>
                            <Typography>Effect: {order.Effects || 'N/A'}</Typography>
                            <Typography>Frame: {order.Frames || 'N/A'}</Typography>

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Created At</Typography>
                            <Typography>
                                {orderDetails?.createdAt
                                    ? new Date(orderDetails?.createdAt).toLocaleString()
                                    : 'N/A'}
                            </Typography>

                            <Divider />

                            <Typography variant="subtitle1" fontWeight="bold">Updated At</Typography>
                            <Typography>
                                {orderDetails?.updatedAt
                                    ? new Date(orderDetails?.updatedAt).toLocaleString()
                                    : 'N/A'}
                            </Typography>

                            <Typography variant="subtitle1" fontWeight="bold">Order Status</Typography>
                            <Typography>
                                {order?.Status
                                    ? order?.Status
                                    : 'N/A'}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} sx={{ color: '#152f48' }}>Close</Button>
                <Button onClick={generatePDF} sx={{ backgroundColor: '#152f48', color: 'white' }}>
                    Download PDF
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewOrderDialog;
