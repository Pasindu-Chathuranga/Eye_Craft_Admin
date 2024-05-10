import './App.css';
import { motion, useScroll } from "framer-motion"
import NavBar from './components/navBar/NavBar';
import MainPage from './pages/mainPage/Main';
import CataloguePage from './pages/catalogue/Catalogue';
import AboutUsPage from './pages/aboutUs/AboutUs';
import ConceptPage from './pages/concept/Concept';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useEffect, useRef, useState } from 'react';

function App() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null); // Use a ref for the container holding all sections
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleLinkClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close the drawer after navigating to a section
    setIsDrawerOpen(false);
  };

  return (
    <div style={{ position: 'relative', top: '0' }} >
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        anchor="left"
        sx={{
          width: 345,
          backgroundColor: '#162F48',
          fontSize: '2.2rem',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 340,
            fontSize: '2.2rem',
            backgroundColor: '#D2B583',
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <button className='drawer-button' onClick={toggleDrawer}><CloseIcon /></button>
          <ListItem sx={{ marginTop: '3%', width: '70%', color: '#162F48' }} button onClick={() => handleLinkClick('main_section')}>
            <ListItemText primary="Main" />
          </ListItem>
          <ListItem sx={{ marginTop: '3%', width: '70%', color: '#162F48' }} button onClick={() => handleLinkClick('concept_section')}>
            <ListItemText primary="Our Process" />
          </ListItem>
          <ListItem sx={{ marginTop: '3%', width: '70%', color: '#162F48' }} button onClick={() => handleLinkClick('catalogue_section')}>
            <ListItemText primary="Product Catalogue" />
          </ListItem>
          <ListItem sx={{ marginTop: '3%', width: '70%', color: '#162F48' }} button onClick={() => handleLinkClick('about_section')}>
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </Drawer>
      <div
        onClick={toggleDrawer} className='button'><MenuOpenIcon /></div>
      <div style={{ position: 'absolute', top: '0' }} ref={containerRef}>
        <motion.div style={{ scaleX: scrollYProgress }} className='scrollbar' />
        <section id="main_section">
          <MainPage id={'main_section'} handleDrawer={toggleDrawer} />
        </section>
        <section id="concept_section">
          <ConceptPage id={'concept_section'} handleDrawer={toggleDrawer} />
        </section>
        <section id="catalogue_section">
          <CataloguePage id={'catalogue_section'} handleDrawer={toggleDrawer} />
        </section>
        <section id="about_section">
          <AboutUsPage id={'about_section'} handleDrawer={toggleDrawer} />
        </section>
      </div>
    </div>
  );
}

export default App;