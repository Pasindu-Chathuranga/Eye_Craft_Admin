import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import LatestOrdersTable from './../components/LatestOrdersTable ';
import Layout from '../components/Layout';

// Material-UI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';

const DashboardPage = () => {
    const salesData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                backgroundColor: '#152f48',
            },
        ],
    };

    const cardItems = [
        {
            title: 'Total Sales',
            value: '1,200',
            icon: <AttachMoneyIcon sx={{ fontSize: 40, color: '#152f48' }} />,
        },
        {
            title: 'Total Income',
            value: '$24,000',
            icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#152f48' }} />,
        },
        {
            title: "Today's Sales",
            value: '120',
            icon: <ShoppingCartIcon sx={{ fontSize: 40, color: '#152f48' }} />,
        },
        {
            title: 'Total Customers',
            value: '450',
            icon: <GroupIcon sx={{ fontSize: 40, color: '#152f48' }} />,
        },
    ];

    return (
        <Layout>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
                {/* State Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {cardItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        {item.icon}
                                        <Box>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="h5">{item.value}</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Weekly Sales Chart */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Weekly Sales Chart
                            </Typography>
                            <Bar data={salesData} />
                        </Card>
                    </Grid>

                    {/* Latest Orders */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={3} > 
                            <LatestOrdersTable />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default DashboardPage;
