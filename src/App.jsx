import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import BookGrid from './components/BookGrid';
import FullCollection from './pages/FullCollection'; // Halaman baru yang akan kita buat
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        
        <Routes>
          {/* Halaman Utama (Home) */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <main className="relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] bg-gray-50">
                <BookGrid />
              </main>
            </>
          } />

          {/* Halaman Koleksi Lengkap */}
          <Route path="/koleksi" element={<FullCollection />} />
        </Routes>

        <ScrollToTop />
        
        <footer className="bg-gray-900 text-gray-500 py-12 text-center text-sm">
          <p>Semua Hak Dilindungi ZXZTech.Ltd © 2026</p>
        </footer>
      </div>
    </Router>
  );
}