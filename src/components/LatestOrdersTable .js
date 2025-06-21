import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Chip
} from '@mui/material';

const LatestOrdersTable = ({ orders }) => {
    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#152f48' }}>
                Latest 5 Orders
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#152f48' }}>
                            <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Customer</TableCell>
                            <TableCell sx={{ color: 'white' }}>Total</TableCell>
                            <TableCell sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell sx={{ color: 'white' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.slice(0, 5).map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>Rs. {order.totalAmount}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.status}
                                        color={
                                            order.status === 'Pending' ? 'warning' :
                                                order.status === 'Processing' ? 'info' :
                                                    order.status === 'Delivered' ? 'success' : 'default'
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default LatestOrdersTable;
