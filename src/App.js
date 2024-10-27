import './App.css';
import { motion, useScroll } from "framer-motion" 
import { useEffect, useRef, useState } from 'react';
import AdminPage from './pages/admin/adminPage';

function App() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null); // Use a ref for the container holding all sections

  return (
    <div style={{ position: 'relative', top: '0' }} >
      <section id="admin_section">
        <AdminPage />
      </section>
    </div>
  );
}

export default App;