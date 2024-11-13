import React from 'react';
import WidgetsIcon from '@mui/icons-material/Camera';
import './admin-style.css';
import OrdersPanel from './widgets/Order_panel';
import ItemPanel from './widgets/Item_panel';
import Logo from '../../images/logo-white.PNG'

const AdminPage = () => {
    return (
        <div>
            <div className='admin-container-header'>
                <div className='admin-container-header-title'><img src={Logo} height='50px' style={{ marginRight: '10px' }} />  | Admin Panel</div>
            </div>
            <div className='admin-container-body'>
                <OrdersPanel />
                <ItemPanel />
            </div>
        </div>
    )
}

export default AdminPage;
