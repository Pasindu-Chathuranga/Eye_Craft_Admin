import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Paper, Select, MenuItem, FormControl, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import ItemForm from './Item_form';
import ItemGrid from './Item_grid';
import axios from "axios";
import { API_URL } from "../../../const/api_url";
import '../admin-style.css';

const filtersInitialState = {
    eye_count: '', print_style: '', size: '', frame: '', effect: '', duo_custom_effects: ''
};

const ItemPanel = () => {
    const [visibility, setVisibility] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState(filtersInitialState);
    const { enqueueSnackbar } = useSnackbar();
    const [shouldRefetch, setShouldRefetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/image/get`);
                setItems(data);
            } catch (error) {
                enqueueSnackbar('Error fetching data', { variant: 'error' });
            }
        };
        fetchData();
        setShouldRefetch(false);
    }, [shouldRefetch]);

    const handleVisibility = () => {
        setVisibility(prev => !prev);
        if (visibility) setEditItem({});
    };

    const handleFilterChange = ({ target: { name, value } }) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleClearFilters = () => setFilters(filtersInitialState);

    const filteredItems = items.filter(item =>
        Object.keys(filters).every(key => !filters[key] || item[key] === filters[key])
    );

    // Filter options for each filter type
    const filterOptions = {
        eye_count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris', 'Quintuple iris'],
        print_style: ['Paper-based print', 'Acrylic Artwork'],
        size: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm', '60cmx60cm', '80cmx80cm', '100cmx100cm'],
        frame: ['Professional frame picture', 'Standard frame picture'],
        effect: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image', 'Splash Effect image'],
        duo_custom_effects: ['Merge', 'Yin Yang', 'Connect', 'Infinity']
    };

    return (
        <Box  p={3} sx={{ bgcolor: 'background.paper', borderRadius: '10px ', width: '55%',maxHeight: '88vh' }}>
            <Grid container spacing={3} justifyContent="start" sx={{ bgcolor: 'background.paper', borderRadius: '10px 10px 0px 0px', width: '104.5%',boxShadow:' 2px 2px 10px 0 rgba(0, 0, 0, 0.5)' }}>
                {/* Header and Add Button on the same row */}
                <Grid item xs={12} sx={{ borderBottom: '1px #1c1c1c solid', paddingBottom: '10px' }}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Typography variant="h3" className="item-panel-header-title" sx={{ fontSize: '1.5rem' }}>Items</Typography>
                        <Button onClick={handleVisibility} mr={3} color="primary" aria-label="add item" sx={{ fontSize: '0.875rem', marginRight: '20px' }}>
                            {visibility ? <CloseIcon sx={{ fontSize: '1.2rem' }} /> : <><AddIcon sx={{ fontSize: '1.2rem' }} /> Add New Item</>}
                        </Button>
                    </Grid>
                </Grid>
                {/* Filters in the row below */}
                {!visibility && (
                    <Grid item xs={12} pb={3}>
                        <Grid container spacing={1} justifyContent="start">
                            {['eye_count', 'print_style', 'size', 'frame', 'effect'].map((filter) => (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body2" sx={{ mb: 1, ml: 2 }}>{filter}</Typography>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <Select
                                            name={filter}
                                            value={filters[filter]}
                                            onChange={handleFilterChange}
                                            sx={{ fontSize: '0.875rem', height: '30px' }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>{`Select ${filter}`}</MenuItem>
                                            {filterOptions[filter]?.map(option => (
                                                <MenuItem key={option} value={option} sx={{ fontSize: '0.75rem' }}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            ))}

                            {/* Show duo_custom_effects filter only when 'eye_count' is 'Duo iris' */}
                            {filters.eye_count === 'Duo iris' && (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="body2" sx={{ mb: 1 }}>Duo Effect</Typography>
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <Select
                                            name="duo_custom_effects"
                                            value={filters.duo_custom_effects}
                                            onChange={handleFilterChange}
                                            sx={{ fontSize: '0.875rem', height: '30px' }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Select Duo Effect</MenuItem>
                                            {filterOptions.duo_custom_effects?.map(option => (
                                                <MenuItem key={option} value={option} sx={{ fontSize: '0.75rem' }}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            )}

                            {/* Clear Filters Button */}
                            <Button onClick={handleClearFilters} sx={{ ml: 2, height: '35px', fontSize: '0.75rem', padding: '6px 12px', marginTop: '30px' }} variant="outlined" color="secondary">Clear Filters</Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {visibility ? (
                <ItemForm editItem={editItem} onCancel={handleVisibility} onSave={() => { enqueueSnackbar('Item saved!', { variant: 'success' }); setShouldRefetch(true); }} />
            ) : (
                <ItemGrid
                    handleEditItem={item => { setEditItem(item); handleVisibility(); }}
                    items={filteredItems}
                    handleVisibility={handleVisibility}
                    setRefetchFlag={setShouldRefetch}
                    handleDeleteItem={() => { enqueueSnackbar('Item deleted!', { variant: 'success' }); setShouldRefetch(true); }}
                />
            )}
        </Box>
    );
};

export default ItemPanel;
