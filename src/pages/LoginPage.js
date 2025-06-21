import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import Logo from '../images/eyecraft_logo/logo-white.png'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const HARD_CODED_EMAIL = 'eyecraftofficial@gmail.com';
    const HARD_CODED_PASSWORD = 'Vishwa80';

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password.trim()) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleLogin = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            if (email === HARD_CODED_EMAIL && password === HARD_CODED_PASSWORD) {
                const token = 'mock-token';
                Cookies.set('authToken', token, { expires: 1 });
                Cookies.set('authExpiry', Date.now() + 86400000, { expires: 1 });
                navigate('/dashboard');
            } else {
                setErrors({ form: 'Invalid credentials' });
            }
        } catch (error) {
            setErrors({ form: 'Login failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box minHeight="100vh" className="login-bg" display="flex" alignItems="center" justifyContent="center">
            <Paper elevation={6} sx={{ maxWidth: 900, width: '100%', borderRadius: '4px', overflow: 'hidden' }}>
                <Grid container>
                    {/* Left side */}
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            background: '#0d0d0d',
                            color: 'white',
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <img src={Logo} width={'350px'} /> 
                    </Grid>

                    {/* Right side */}
                    <Grid item xs={12} md={6} sx={{ p: 4 }}>
                        <Typography variant="h5" mb={2} color="#152f48">
                            Admin Login
                        </Typography>

                        {errors.form && (
                            <Typography color="error" mb={1}>
                                {errors.form}
                            </Typography>
                        )}

                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, bgcolor: '#152f48' }}
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default LoginPage;
