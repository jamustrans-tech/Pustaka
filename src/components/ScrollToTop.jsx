import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Tambahkan ini

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation(); // Mendeteksi perubahan halaman

  // 1. FUNGSI OTOMATIS: Reset scroll ke atas setiap kali pindah halaman (Route)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. FUNGSI TOMBOL: Pantau posisi scroll untuk memunculkan tombol manual
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTopManual = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTopManual}
          className="fixed bottom-8 right-8 z-[100] p-4 bg-amber-500 text-black rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:bg-white transition-colors group"
        >
          <ChevronUp 
            size={24} 
            className="group-hover:-translate-y-1 transition-transform" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}