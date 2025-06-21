import React, { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemText, Divider,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button, Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Logo from '../images/eyecraft_logo/logo-multi.png';

const Layout = ({ children }) => {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('authExpiry');
    navigate('/login');
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const getListItemStyle = (route) => {
    return location.pathname === route
      ? { backgroundColor: '#152f48', color: '#fff' }
      : { color: '#152f48' };
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            color: '#152f48',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Box sx={{ textAlign: 'start' }}>
            <img src={Logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
          </Box>

          <List>
            <ListItem button component={Link} to="/dashboard" style={getListItemStyle('/dashboard')}>
              <DashboardIcon sx={{ mr: 3, ml: 3 }} />
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/orders" style={getListItemStyle('/orders')}>
              <ShoppingCartIcon sx={{ mr: 3, ml: 3 }} />
              <ListItemText primary="Orders" />
            </ListItem>
          </List>

          <Divider />

          {/* Logout */}
          <ListItem button onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 3, ml: 3 }} />
            <ListItemText primary="Log Out" />
          </ListItem>
        </div>
      </Drawer>

      {/* Main content */}
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>

      {/* Logout confirmation dialog */}
      <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary" sx={{ color: '152f48' }}>Cancel</Button>
          <Button onClick={confirmLogout} variant="contained" sx={{ backgroundColor: '#152f48', color: 'white' }}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
