// AdminPage.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Panorama, Inventory, ModeStandby } from '@mui/icons-material';
import { useSnackbar } from 'notistack'; 
import Logo from '../../images/logo-white.PNG';
import LoginComponent from './widgets/LoginComponent';
import ItemPanel from './widgets/Items/Item_panel';
import OrdersPanel from './widgets/Orders/Order_panel';

// Allowed pages (for validation)
const allowedPages = ['item', 'order'];

const AdminPage = () => {
    const [selectedPage, setSelectedPage] = useState('item'); // Default to 'item' without relying on localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const authenticated = !!localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authenticated);

        // Only set `selectedPage` if it's a valid value in `allowedPages`
        const storedPage = localStorage.getItem('selectedPage');
        if (authenticated && allowedPages.includes(storedPage)) {
            setSelectedPage(storedPage);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && allowedPages.includes(selectedPage)) {
            localStorage.setItem('selectedPage', selectedPage);
        }
    }, [selectedPage, isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
        enqueueSnackbar('Login successful!', { variant: 'success' });
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication flag in localStorage
        setSelectedPage('item'); // Set default page after login
    };

    const handleLogout = () => {
        setLogoutDialogOpen(true);
    };

    const confirmLogout = () => {
        setIsAuthenticated(false);
        setSelectedPage(null);
        setLogoutDialogOpen(false);
        enqueueSnackbar('Logged out successfully', { variant: 'info' });
        localStorage.removeItem('selectedPage');
        localStorage.removeItem('isAuthenticated');
    };

    const cancelLogout = () => {
        setLogoutDialogOpen(false);
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <div className="admin-container-header">
                        <div className="admin-container-header-title">
                            <img src={Logo} height="40px" style={{ marginRight: '10px' }} alt="Logo" /> | Admin Panel
                        </div>
                        <div className="admin-container-header-widgets">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Panorama />}
                                sx={{ marginRight: '10px' }}
                                onClick={() => setSelectedPage('item')}
                            >
                                Items
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Inventory />}
                                sx={{ marginRight: '10px' }}
                                onClick={() => setSelectedPage('order')}
                            >
                                Orders
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ModeStandby />}
                                onClick={handleLogout}
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                    <div className="admin-container-body">
                        {selectedPage === 'item' ? <ItemPanel /> : selectedPage === 'order' ? <OrdersPanel /> : <div>Select a section from the navigation.</div>}
                    </div>
                    <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to log out?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={cancelLogout} color="primary">Cancel</Button>
                            <Button onClick={confirmLogout} color="secondary">OK</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ) : (
                <LoginComponent onLogin={handleLogin} />
            )}
        </div>
    );
};

export default AdminPage;
