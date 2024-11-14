import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const OrderStatusFilter = ({ filter, setFilter }) => {
    const handleFilterChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

    return (
        <div>
            <TextField
                select
                label="Status"
                value={filter.status}
                name="status"
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                sx={{ mr: 3, width:'250px'}}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="completed">Canceled</MenuItem>
            </TextField>
            <TextField
                type="date"
                label="Date"
                value={filter.date}
                name="date"
                onChange={handleFilterChange}
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '250px' }}
            />
        </div>
    );
};

export default OrderStatusFilter;
