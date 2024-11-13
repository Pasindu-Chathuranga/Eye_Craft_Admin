import './App.css';
import { motion, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from 'react';
import AdminPage from './pages/admin/adminPage';
import { SnackbarProvider } from 'notistack';

function App() {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null); // Use a ref for the container holding all sections

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <div style={{ position: 'relative', top: '0' }} >
        <section id="admin_section">
          <AdminPage />
        </section>
      </div>
    </SnackbarProvider>
  );
}

export default App;