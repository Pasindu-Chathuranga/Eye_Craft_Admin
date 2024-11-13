import React, { useState, useEffect } from 'react';
import ImageUpload from './UploadImage';
import axios from 'axios';
import { API_URL } from '../../../const/api_url';
import {
    TextField,
    Button,
    Grid,
    Box,
    Typography,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    Snackbar,
    Alert,
} from '@mui/material';

const ItemForm = ({ editItem, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        eye_count: '',
        print_style: '',
        size: '',
        frame: '',
        effect: '',
        duo_custom_effects: '',
        image_url: '',
        price: '',
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value && key !== 'duo_custom_effects') {
                newErrors[key] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        if (!validateForm()) {
            setNotification({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
            return;
        }

        try {
            const response = editItem.eye_count
                ? await axios.put(`${API_URL}/image/update/${editItem._id}`, formData).then(() => {
                    setNotification({ open: true, message: 'Item saved successfully', severity: 'success' });
                    onCancel()
                    onSave();
                }).catch(() => {
                    setNotification({ open: true, message: 'Failed to save item', severity: 'error' });
                })
                : await axios.post(`${API_URL}/image/add`, formData).then(() => {
                    setNotification({ open: true, message: 'Item saved successfully', severity: 'success' });
                    onCancel()
                    onSave();
                }).catch(() => {
                    setNotification({ open: true, message: 'Failed to save item', severity: 'error' });
                });
        } catch (error) {
            console.error('Error saving item:', error);
            setNotification({ open: true, message: 'Error saving item', severity: 'error' });
        }
    };

    useEffect(() => {
        if (editItem) {
            setFormData({
                eye_count: editItem.eye_count || '',
                print_style: editItem.print_style || '',
                size: editItem.size || '',
                frame: editItem.frame || '',
                effect: editItem.effect || '',
                duo_custom_effects: editItem.duo_custom_effects || '',
                image_url: editItem.image_url || '',
                price: editItem.price || '',
            });
        }
    }, [editItem]);

    const eye_countOptions = ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris', 'Quintuple iris'];
    const print_styles = ['Paper-based print', 'Acrylic Artwork'];
    const sizes = ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm', '60cmx60cm', '80cmx80cm', '100cmx100cm'];
    const frames = ['Professional frame picture', 'Standard frame picture'];
    const effects = ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image', 'Splash Effect image'];
    const duo_custom_effects = ['Merge', 'Yin Yang', 'Connect', 'Infinity'];

    const handleNotificationClose = () => {
        setNotification({ open: false, message: '', severity: '' });
    };

    return (
        <Box p={4} sx={{ margin: '10px auto', height: '80%', bgcolor: 'background.paper', borderRadius: 3  }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {editItem.eye_count ? 'Edit Item' : 'Add New Item'}
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ImageUpload handleImageUrl={(url) => handleChange('image_url', url)} imageurl={formData.image_url} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <FormControl component="fieldset" error={!!errors.eye_count}>
                                    <FormLabel component="legend">Eye Count *</FormLabel>
                                    <RadioGroup
                                        row
                                        value={formData.eye_count}
                                        onChange={(e) => handleChange('eye_count', e.target.value)}
                                    >
                                        {eye_countOptions.map((option) => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                        ))}
                                    </RadioGroup>
                                    {errors.eye_count && <Typography color="error">{errors.eye_count}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.print_style}>Print Style *</FormLabel>
                                <TextField
                                    select
                                    fullWidth
                                    value={formData.print_style}
                                    onChange={(e) => handleChange('print_style', e.target.value)}
                                    variant="standard"
                                    error={!!errors.print_style}
                                    helperText={errors.print_style}
                                    required
                                >
                                    {print_styles.map((style) => (
                                        <MenuItem key={style} value={style}>{style}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.size}>Size *</FormLabel>
                                <TextField
                                    select
                                    fullWidth
                                    value={formData.size}
                                    onChange={(e) => handleChange('size', e.target.value)}
                                    variant="standard"
                                    error={!!errors.size}
                                    helperText={errors.size}
                                    required
                                >
                                    {sizes.map((size) => (
                                        <MenuItem key={size} value={size}>{size}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.frame}>Frame *</FormLabel>
                                <TextField
                                    select
                                    fullWidth
                                    value={formData.frame}
                                    onChange={(e) => handleChange('frame', e.target.value)}
                                    variant="standard"
                                    error={!!errors.frame}
                                    helperText={errors.frame}
                                    required
                                >
                                    {frames.map((frame) => (
                                        <MenuItem key={frame} value={frame}>{frame}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.effect}>Effect *</FormLabel>
                                <TextField
                                    select
                                    fullWidth
                                    value={formData.effect}
                                    onChange={(e) => handleChange('effect', e.target.value)}
                                    variant="standard"
                                    error={!!errors.effect}
                                    helperText={errors.effect}
                                    required
                                >
                                    {effects.map((effect) => (
                                        <MenuItem key={effect} value={effect}>{effect}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {formData.eye_count === 'Duo iris' && (
                                <Grid item xs={12}>
                                    <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.duo_custom_effects}>Duo Custom Effect *</FormLabel>
                                    <TextField
                                        select
                                        fullWidth
                                        value={formData.duo_custom_effects}
                                        onChange={(e) => handleChange('duo_custom_effects', e.target.value)}
                                        variant="standard"
                                        error={!!errors.duo_custom_effects}
                                        helperText={errors.duo_custom_effects}
                                    >
                                        {duo_custom_effects.map((effect) => (
                                            <MenuItem key={effect} value={effect}>{effect}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <FormLabel component="legend" sx={{ marginBottom: '10px' }} error={!!errors.price}>Product Price *</FormLabel>
                                <TextField
                                    type="number"
                                    fullWidth
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    variant="standard"
                                    error={!!errors.price}
                                    helperText={errors.price}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} mt={5} display="flex" justifyContent="flex-end">
                            <Button type="button" variant="contained" color="secondary" sx={{ marginRight: '10px' }} size="large" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" size="large">
                                {editItem.eye_count ? 'Save Changes' : 'Add Item'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
            <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleNotificationClose}>
                <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ItemForm;
