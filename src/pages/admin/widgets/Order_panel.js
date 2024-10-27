import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import placeholderImage from '../../../images/admin/image-holder.svg'
import { API_URL } from '../../../const/api_url';
import axios from 'axios';

const OrdersPanel = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(API_URL + '/order/get');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className='order-panel'>
            <div className='order-panel-header'>
                <div className='order-panel-header-title'>Orders</div>
                <div className='order-panel-header-search-bar'>
                    <input type='text' placeholder='Search' />
                    <div className='order-panel-header-search-bar-icon'><SearchIcon /></div>
                    <div className='order-panel-header-search-bar-icon'><CloseIcon /></div>
                    <div className='item-panel-header-search-bar-icon'><FilterListIcon /></div>
                </div>
            </div>
            <div className='order-panel-body'>
                {orders.length != 0 ? orders.map(order => (
                    <Accordion key={order.id} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}
                        >
                            <div className='order-panel-body-item-status'>Pending</div>
                            <div className='order-panel-body-item-date'>12/12/2021</div>
                            Order Id  :
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='order-panel-body-item'>
                                <div className='order-panel-data'>
                                    <div className='order-panel-body-item-title'>Order 1</div>
                                    <div className='order-panel-body-item-title'>name </div>
                                    <div className='order-panel-body-item-title'>Contact</div>
                                    <div className='order-panel-body-item-title'>address</div>
                                    <div className='order-panel-body-item-title'>city</div>
                                </div>
                                <div className='order-panel-middle'>
                                    <img src={placeholderImage} alt='Placeholder' className='order-image' />
                                    <div className='order-item-details'>
                                        <div className='order-panel-body-item-title'>Order 1</div>
                                        <div className='order-panel-body-item-title'>name </div>
                                        <div className='order-panel-body-item-title'>Contact</div>
                                        <div className='order-panel-body-item-title'>address</div>
                                        <div className='order-panel-body-item-title'>city</div>
                                    </div>
                                </div>
                                <div className='order-panel-body-item-action'>
                                    <div className='order-panel-body-item-action-icon'><EditIcon /></div>
                                    <div className='order-panel-body-item-action-icon'><DeleteIcon /></div>
                                    <div className='order-panel-body-item-action-icon'><DoneIcon /></div>
                                    <div className='order-panel-body-item-action-icon'><CloseIcon /></div>
                                    <div className='order-panel-body-item-action-icon'><EmailIcon /></div>
                                </div>
                            </div>

                        </AccordionDetails>
                    </Accordion>
                )) : (
                    <div className='order-panel-body-no-item'>
                        <div className='order-panel-body-no-item-icon'><InboxIcon /></div>
                       <div className='order-panel-col'>
                                <div className='order-panel-body-no-item-title'>No Order</div>
                                <div className='order-panel-body-no-item-description'>You have no orders</div>
                       </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdersPanel;
