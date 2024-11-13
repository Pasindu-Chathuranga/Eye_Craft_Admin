// LoginComponent.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import '../admin-style.css'
import Logo from '../../../images/eyecraft_logo/logo.png';

const LoginComponent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // Hardcoded credentials
    const validUsername = 'eyecraftofficial@gmail.com';
    const validPassword = 'Vishwa80';

    const handleLogin = () => {
        if (username.toLowerCase() === validUsername && password === validPassword) {
            onLogin();
            enqueueSnackbar('Login successful!', { variant: 'success' });
        } else {
            enqueueSnackbar('Invalid username or password', { variant: 'error' });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ bgcolor: '#ffffff', width: '60%', height: '450px', marginLeft: 'auto', marginRight: 'auto' }} p={5} borderRadius={5} display="flex" flexDirection="row" alignItems="center" justifyContent='space-between' mt={10}>
            <Box>
                <Typography variant="h5" pb={4} gutterBottom>Login to Admin Panel</Typography>
                <Box
                    component="form"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    maxWidth="300px"
                    gap={2}
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
            <div className='loginback'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img src={Logo} style={{ borderRadius: '5px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        <Typography variant={'h2'} sx={{ color: '#D3D4D9', marginTop: '20px' }}>
                            Eye Craft
                        </Typography>
                        <Typography variant={'h4'} gutterBottom sx={{ color: '#D3D4D9' }}>
                            Art in Every Blink
                        </Typography>
                    </div>
                </div>
            </div> 
        </Box >
    );
};

export default LoginComponent;
