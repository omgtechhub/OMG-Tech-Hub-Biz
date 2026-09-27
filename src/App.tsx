import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import ChatWidget from './components/ChatWidget';
import ScrollProgress from './components/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import { LoadingScreen, CursorFollower } from './components/animations';

export default function App() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <LoadingScreen />
      <CursorFollower />
      <CustomCursor />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform' }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </>
  );
}
