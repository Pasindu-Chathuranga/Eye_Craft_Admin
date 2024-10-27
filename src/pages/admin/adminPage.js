import React from 'react';
import WidgetsIcon from '@mui/icons-material/Camera'; 
import './admin-style.css';
import OrdersPanel from './widgets/Order_panel';
import ItemPanel from './widgets/Item_panel';

const AdminPage = () => {
    return (
        <div>
            <div className='admin-container-header'>
                <div className='admin-container-header-title'><WidgetsIcon /> Eye Craft Admin Panel</div>
            </div>
            <div className='admin-container-body'>
                <OrdersPanel />
                <ItemPanel />
            </div>
        </div>
    )
}

export default AdminPage;
