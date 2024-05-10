import React, { useEffect, useRef } from 'react';
import WidgetsIcon from '@mui/icons-material/Camera';
import './concept-style.css';
import { Icon } from '@mui/material';
import bookingImage from '../../images/concept/booking-img.png';
import takeImage from '../../images/concept/take-image.webp';
import diliveryImage from '../../images/concept/diliver-image.png'; 

const ConceptPage = ({ id, handleDrawer }) => {

    return (
        <section id={id} className="concept-container" >
            <h1 className='main-title concept-title' onClick={handleDrawer}> 
                Our Process
            </h1>
            <div className='concept-item-container'>

                <div className='card-container-1'>
                    <div className='card-image-1'>
                        {/* <img src={bookingImage} alt='booking' className='card-inside-image' /> */}
                    </div>
                    <div className='card-text-1'>
                        <h3 className='card-title-1'>Book Your Appointment</h3>
                        <h5 className='card-para-1'>
                            Customize your EyeCraft experience by selecting your preferred
                            eye count and size. Explore various print and frame styles,
                            and enjoy complimentary iris effects of your choice when placing
                            your order with EyeCraft.
                        </h5>
                    </div>
                </div>

                <div className='card-container-2'>
                    <div className='card-image-2 card-inside-image'>
                        {/* <img src={takeImage} alt='Booking Image' className='card-inside-image' /> */}
                    </div>
                    <div className='card-text-wrapper'>
                        <div className='card-text-2'>
                            <h3 className='card-title-2'>Capture Your Iris</h3>
                            <h5 className='card-para-2'>
                                Experience the convenience of our mobile iris photography service.
                                We bring state-of-the-art equipment to your location for a quick session
                                capturing every detail of your iris in just minutes.
                            </h5>
                        </div>
                    </div>
                </div>

                <div className='card-container-1'>
                    <div className='card-image-1'>
                        {/* <img src={diliveryImage} alt='Booking Image' className='card-inside-image' /> */}
                    </div>
                    <div className='card-text-1'>
                        <h3 className='card-title-1'>Delivered to Your Doorstep</h3>
                        <h5 className='card-para-1'>
                            We print your high-quality image with precision,
                            frame it with our special materials in-house,
                            and deliver the final product to your doorstep within 3-4 working days.
                        </h5>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ConceptPage;