import React, { useEffect, useRef, useState } from 'react';
import Checkbox from "react-custom-checkbox";
import './catalogue-style.css';
import { Accordion, AccordionDetails, AccordionSummary, Icon, Pagination, Modal, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'; // Import Axios for making API calls ';
import { API_URL } from '../../const/const/api_url';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StyleIcon from '@mui/icons-material/Style';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Drawer from '@mui/material/Drawer';

const CataloguePage = ({ id, handleDrawer }) => {
    const [items, setItems] = useState([]); // State to store fetched items
    const [filteredData, setFilteredData] = useState([]); // State to store filtered items
    const [filters, setFilters] = useState({
        Eye_Count: ['Single iris', 'Duo iris', 'Trio iris', 'Quadruple iris', 'Quintuple iris'],
        Print_Style: ['Paper-based print', 'Acrylic Artwork'],
        Sizes: ['20cmx20cm', '30cmx30cm', '40cmx40cm', '50cmx50cm', '60cmx60cm', '80cmx80cm', '100cmx100cm'],
        Frames: ['Professional frame picture', 'Standard frame picture'],
        Effects: ['Pure effect image', 'Explosion effect image', 'Halo effect image', 'Dust effect image', 'Splash Effect image'],
        Duo_Custom_Effects: ['Merge', 'Yin Yang', 'Connect', 'Infinity']
    });
    const [selectedFilters, setSelectedFilters] = useState({
        Eye_Count: [],
        Print_Style: [],
        Sizes: [],
        Frames: [],
        Effects: [],
        Duo_Custom_Effects: []
    });
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        // Fetch data from the API using Axios
        axios.get(API_URL + '/image/get')
            .then(response => {
                setItems(response.data); // Update the state with fetched items
                setFilteredData(response.data); // Update the state with fetched items
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleFilterChange = (filterType, value) => {
        // Update the selected filters state based on the filter type and value
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter(item => item !== value)
                : [...prevFilters[filterType], value]
        }));
    };


    useEffect(() => {
        const filteredItems = items.filter(item => {
            return (
                selectedFilters.Eye_Count.includes(item.eye_count) ||
                selectedFilters.Print_Style.includes(item.print_style) ||
                selectedFilters.Sizes.includes(item.size) ||
                selectedFilters.Frames.includes(item.frame) ||
                selectedFilters.Effects.includes(item.effect) ||
                selectedFilters.Duo_Custom_Effects.includes(item.duo_custom_effects)
            )
        })

        setFilteredData(filteredItems);

    }, [selectedFilters]);

    const onCheckedChanged = (filterType, value, e) => {

        const addSelectedFilterItem = (filterType, value) => {
            setSelectedFilters(prevSelectedFilters => ({
                ...prevSelectedFilters,
                [filterType]: [...prevSelectedFilters[filterType], value]
            }));
        };

        const removeSelectedFilterItem = (filterType, value) => {
            setSelectedFilters(prevSelectedFilters => ({
                ...prevSelectedFilters,
                [filterType]: prevSelectedFilters[filterType].filter(item => item !== value)
            }));
        };

        if (!selectedFilters[filterType].includes(value)) {
            addSelectedFilterItem(filterType, value);
        } else {
            removeSelectedFilterItem(filterType, value);
        }
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const closeDrawer = () => {
        setDrawerOpen(false)
    }
    return (
        <section id={id} className="catalogue-container" >
            <h1 className='main-title catalogue-title' onClick={handleDrawer} >
                Catalogue
            </h1>
            <div className='catalogue-main-container'>
                <div className='catalogue-filters'>

                    {
                        Object.keys(filters).map(filterType => (
                            <Accordion key={filterType}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    {filterType.replace('_',' ')}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {filters[filterType].map(value => (
                                        <div className='filter-item' key={value}>
                                            <Checkbox
                                                icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                                borderColor="#D7C629"
                                                borderRadius={2}
                                                size={18}
                                                name={value}
                                                style={{ marginLeft: 10 }}
                                                label={value}
                                                onChange={(e) => onCheckedChanged(filterType, value, e)}
                                            />
                                        </div>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }

                </div>
                <div className='catalogue-body'>

                    {
                        filteredData.length > 0 ? (
                            <div className='catalogue-item-container'>
                                {filteredData.map(item => (
                                    <div className='catalogue-item' key={item.id} onClick={() => openModal(item)}>
                                        <div className='catalogue-item-image-container'>
                                            <img key={item.id} className='catalogue-item-image' src={item.image_url} alt={item.name} />
                                        </div>
                                        <div className='catalogue-item-details'>
                                            <div className='catalogue-item-name'>{item.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='catalogue-empty-container'>
                                <div className='catalogue-empty-text-header'>No items found</div>
                                <div className='catalogue-empty-text'>Try changing the filters</div>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* Modal */}
            <Modal
                open={modalOpen}
                sx={{ backgroundColor: '#0000009a', backdropFilter: 'blur(10px)' }}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: '100%', height: '100%', padding: '0', backgroundColor: '#000000', backdropFilter: 'blur(10px)', p: 2 }}>
                    {selectedItem && (
                        <>
                            <div className='modal-container'>
                                <div className='model-close-button' onClick={closeModal}>X</div>
                                <img className='modal-image' src={selectedItem.image_url} alt={selectedItem.name} />
                            </div>
                            <div className={!drawerOpen ? 'modal-item-details' : 'modal-item-details-drawerOPener '} onClick={() => setDrawerOpen(!drawerOpen)}>
                                <div className={drawerOpen ? 'drawerCloase-icon' : 'drawerCloase-icon-1'} onClick={() => setDrawerOpen(!drawerOpen)}>
                                    {!drawerOpen ? 'X' : <u>View details</u>}
                                </div>
                                <div className='modal-item-row'>
                                    <Icon><RemoveRedEyeIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Eye count</span>
                                        <span>{selectedItem.eye_count}</span>
                                    </div>
                                </div>
                                <div className='modal-item-row'>
                                    <Icon><StyleIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Print Style</span>
                                        <span>{selectedItem.print_style}</span>
                                    </div>
                                </div>
                                <div className='modal-item-row'>
                                    <Icon><AspectRatioIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Size</span>
                                        <span>{selectedItem.size}</span>
                                    </div>
                                </div>
                                <div className='modal-item-row'>
                                    <Icon sx={{ fontSize: '30px' }}><ImageAspectRatioIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Frame</span>
                                        <span>{selectedItem.frame}</span>
                                    </div>
                                </div>
                                <div className='modal-item-row'>
                                    <Icon size='xxl' sx={{ fontSize: '30px' }}><BlurOnIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Effects</span>
                                        <span>{selectedItem.effect}</span>
                                    </div>
                                </div>
                                <div className='modal-item-row'>
                                    <Icon><AllInclusiveIcon /></Icon>
                                    <div className='modal-item-name'>
                                        <span className='single-data-header'>Duo Custom Effect</span>
                                        <span>{selectedItem.duo_custom_effects}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Box>
            </Modal>


        </section >
    );
}

export default CataloguePage;