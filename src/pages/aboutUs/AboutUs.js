import React, { useEffect, useRef, useState } from 'react';
import './about-style.css';
import image from '../../images/main/12.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WidgetsIcon from '@mui/icons-material/Widgets';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Icon, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const AboutUsPage = ({ id, handleDrawer }) => {
    const [showNextSection, setShowNextSection] = useState(false);
    const [filters, setFilters] = useState({
        Eye_Count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris', 'Quintuple iris'],
        Print_Style: ['Paper-based print', 'Acrylic Artwork'],
        Sizes: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm', '60cmx60cm', '80cmx80cm', '100cmx100cm'],
        Frames: ['Professional frame picture', 'Standard frame picture'],
        Effects: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image', 'Splash Effect image'],
        Duo_Custom_Effects: ['Merge', 'Yin Yang', 'Connect', 'Infinity']
    });
    const [errors, setErrors] = useState({});
    const [formData, setformData] = useState({
        Eye_Count: '',
        Print_Style: '',
        Sizes: '',
        Frames: '',
        Effects: '',
        Duo_Custom_Effects: '',
        customerName: '',
        customerEmail: '',
        customerContact: '',
        customerAddress: '',
        customerCity: '',
    });

    const onChange = (e, filterType, value) => {
        e.preventDefault();
        formData[filterType] = value

        console.log(formData[filterType])
    }

    const onTextChange = (e) => {
        const { name, value } = e.target;
        setformData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData[e.target.name])
    }

    const nextSection = () => {
        if (formData.Eye_Count == '') {
            alert('Select eye count')
            return;
        }
        if (formData.Print_Style == '') {
            alert('Select print style')
            return;
        }
        if (formData.Sizes == '') {
            alert('Select size')
            return;
        }
        if (formData.Frames == '') {
            alert('Select frame')
            return;
        }
        if (formData.Effects == '') {
            alert('Select effect')
            return;
        }
        setShowNextSection(true)
    }

    const validateInputs = () => {
        const errors = {};

        // Name validation
        if (!formData.customerName.trim()) {
            errors.customerName = 'Name is required';
        }

        // Email validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!formData.customerEmail.trim()) {
            errors.customerEmail = 'Email is required';
        } else if (!emailRegex.test(formData.customerEmail)) {
            errors.customerEmail = 'Invalid email address';
        }

        // Phone number validation
        const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
        if (!formData.customerContact.trim()) {
            errors.customerContact = 'Phone number is required';
        } else if (!phoneRegex.test(formData.customerContact)) {
            errors.customerContact = 'Invalid phone number';
        }

        // Address validation
        if (!formData.customerAddress.trim()) {
            errors.customerAddress = 'Address is required';
        }

        // City validation
        if (!formData.customerCity.trim()) {
            errors.customerCity = 'City is required';
        }

        setErrors(errors);

        // Return true if no errors, false otherwise
        return Object.keys(errors).length === 0;
    };

    return (
        <section id={id} className="aboutUs-container" >
            <div className='main-title aboutUs-title' onClick={handleDrawer}>
                <h1>Contact Us</h1>
            </div>
            <div className='about-main-container'>
                <div className='about-right-section'>
                    <div className='about-right-top-container'>
                        <img className='about-image' src={image} alt='about us' />
                    </div>
                    <div className='about-right-bottom-container'>
                        <h3 className='about-title'>Eye-Craft</h3>
                        <div className='contact-item'>
                            <LocalPostOfficeIcon sx={{
                                fontSize: '20px',
                                paddingTop: '10px',
                                marginRight: '10px',
                            }} />
                            eyecraftofficial@gmail.com</div>
                        <div className='contact-item'>
                            <LocalPhoneIcon sx={{
                                fontSize: '20px',
                                paddingTop: '10px',
                                marginRight: '10px',
                            }} />
                            +97 77 051 6629</div>
                        <div className='contact-item'>
                            <InstagramIcon sx={{
                                fontSize: '20px',
                                paddingTop: '10px',
                                marginRight: '10px',
                            }} />
                            https://www.instagram.com/eyecraft.official</div>
                        <div className='contact-item'>
                            <FacebookIcon sx={{
                                fontSize: '20px',
                                paddingTop: '10px',
                                marginRight: '10px',
                            }} />
                            facebook/eyecraft</div>

                    </div>
                </div>
                <div className='about-left-section'>
                    {
                        !showNextSection ? (
                            <div className='about-form-wrapper'>
                                <h2 className='about-form-title'>Make an appointment</h2>

                                <div className='about-form'>
                                    {Object.keys(filters).map(filterType => (
                                        <div className='form-group'>
                                            <header className='form-group-header'>
                                                {filterType != 'Duo_Custom_Effects' ?
                                                    <> {filterType.replace('_', ' ')} <span style={{ color: '#e23a2e' }}> *</span></>
                                                    : filterType.replace('_', ' ')}
                                            </header>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name={filterType}
                                            >
                                                <div className='form-group-items'>
                                                    {filters[filterType].map(value => (
                                                        <div>
                                                            <FormControlLabel
                                                                value={value}
                                                                onChange={(e) => onChange(e, filterType, value)}
                                                                control={<Radio sx={{ color: '#D2B583', '&.Mui-checked': { color: '#D2B583' } }} />}
                                                                label={value} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    ))}

                                    <button className='btn' type='button' onClick={() => nextSection()}>Next</button>

                                </div>
                            </div>
                        ) : (
                            <div className='about-form-wrapper'>
                                <h2 className='about-form-title'>Make an appointment</h2>
                                <div className='about-form'>

                                    <div className='form-group-2'>
                                        <header className='form-group-header'>Name</header>
                                        <input type="text" id="customerName" onChange={onTextChange} value={formData.customerName} name="customerName" placeholder="Enter your name" />
                                    </div>

                                    <div className='form-group-2'>
                                        <header className='form-group-header'>Email</header>
                                        <input type="email" id="customerEmail" onChange={onTextChange} value={formData.customerEmail} name="customerEmail" placeholder="Enter your email" />
                                    </div>

                                    <div className='form-group-2'>
                                        <header className='form-group-header'>Phone Number</header>
                                        <input type="tel" id="customerContact" onChange={onTextChange} value={formData.customerContact} name="customerContact" placeholder="Enter your phone number" />
                                    </div>

                                    <div className='form-group-2'>
                                        <header className='form-group-header'>Appointment aAddress</header>
                                        <textarea id="customerAddress" onChange={onTextChange} name="customerAddress" placeholder="Enter your address">{formData.customerAddress}</textarea>
                                    </div>

                                    <div className='form-group-2'>
                                        <header className='form-group-header'>Town</header>
                                        <input type="text" id="customerCity" onChange={onTextChange} value={formData.customerCity} name="customerCity" placeholder="Enter your town" />
                                    </div>

                                    <button className='btn-2' type='button' onClick={() => setShowNextSection(false)}>Back</button>
                                    <button className='btn-2'>Submit</button>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div >
        </section >
    );
}

export default AboutUsPage;