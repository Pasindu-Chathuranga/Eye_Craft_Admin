import React, { useRef } from 'react';
import { motion } from "framer-motion"
import './main-style.css';

import image1 from '../../images/main/1.jpg'
import image2 from '../../images/main/2.jpeg'
import image3 from '../../images/main/3.webp'
import image4 from '../../images/main/4.webp'
import image5 from '../../images/main/5.jpg'
import image6 from '../../images/main/6.png'
import image7 from '../../images/main/7.jpg'
import image8 from '../../images/main/8.jpg'
import image9 from '../../images/main/9.jpg'
import image10 from '../../images/main/10.jpg'
import image11 from '../../images/main/11.webp'
import image12 from '../../images/main/12.webp'
import image13 from '../../images/main/13.webp'
import image14 from '../../images/main/14.webp'
import { Icon } from '@mui/material';
import WidgetsIcon from '@mui/icons-material/Camera';


const MainPage = ({ id, handleDrawer }) => {

    const handleLinkClick = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } 
    };

    return (
        <section id={id} className="main-container" >
            <div className='main-bg-image'></div>
            <div className='main-column'>
                <h1 className='main-title mainPage-title'>
                    <Icon onClick={handleDrawer} fontSize='xxl' sx={{ width: '80px', height: '80px', marginRight: '2%' }}>
                        <WidgetsIcon sx={{ width: '80px', height: '80px', marginRight: '2%' }} />
                    </Icon>
                    Eye-Craft
                </h1>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className='main-subtitle'>Art in Every Blink.</motion.div>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className='paragraph main-para'>
                    Embark on a journey of visual storytelling through iris photography,
                    capturing the unique beauty of each individual's
                    eyes with premium quality and cutting-edge equipment,
                    offering an exclusive opportunity for artistic expression and immobilization.
                </motion.p>
                <div className='main-row'>
                    <div className="gallery">
                        <img src={image1} alt="" />
                        <img src={image2} alt="" />
                        <img src={image3} alt="" />
                        <img src={image4} alt="" />
                        <img src={image5} alt="" />
                        <img src={image6} alt="" />
                        <img src={image7} alt="" />
                    </div>
                    <div className="gallery">
                        <img src={image8} alt="" />
                        <img src={image9} alt="" />
                        <img src={image10} alt="" />
                        <img src={image11} alt="" />
                        <img src={image12} alt="" />
                        <img src={image13} alt="" />
                        <img src={image14} alt="" />
                    </div>
                </div>
                <button className='main-button' onClick={() => handleLinkClick('catalogue_section')}>View Catalogue</button>
            </div>
        </section >
    );
}

export default MainPage;