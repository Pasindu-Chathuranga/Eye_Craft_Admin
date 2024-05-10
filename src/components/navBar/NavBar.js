// NavBar.js
import React from 'react';

const NavBar = ({ isOpen, onToggle, onLinkClick }) => {
    return (
        <div className={`nav-bar ${isOpen ? 'open' : ''}`}>
            <button className="toggle-button" onClick={onToggle}>
                {isOpen ? 'Close' : 'Open'} Drawer
            </button>
            <nav>
                <ul>
                    <li><button onClick={() => onLinkClick('main_section')}>Main</button></li>
                    <li><button onClick={() => onLinkClick('concept_section')}>Concept</button></li>
                    <li><button onClick={() => onLinkClick('catalogue_section')}>Catalogue</button></li>
                    <li><button onClick={() => onLinkClick('about_section')}>About Us</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
