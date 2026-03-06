import { useState, useEffect } from 'react';
import { Menu, X, Book } from 'lucide-react';
import { HashLink } from 'react-router-hash-link'; // Pastikan sudah instal: npm install react-router-hash-link
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek untuk mengubah background navbar saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data Menu agar lebih rapi
  const menuItems = [
    { name: 'Home', path: '/#home' },
    { name: 'Tentang', path: '/#tentang' },
    { name: 'Koleksi', path: '/#koleksi-buku' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 px-6 py-4 ${
      scrolled || isOpen ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo - Menggunakan Link ke / agar kembali ke paling atas */}
        <Link to="/"
              replace={true} // KUNCI UTAMA: Mengganti riwayat, bukan menambah 
              className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
          <Book className="text-amber-500" />
          <span>PUSTAKA.</span>
        </Link>

        {/* Desktop Menu - Menggunakan HashLink */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-white">
          {menuItems.map((item) => (
            <HashLink 
              key={item.name}
              smooth 
              to={item.path} 
              className="hover:text-amber-500 transition-colors"
            >
              {item.name}
            </HashLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Menggunakan HashLink */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 flex flex-col p-8 space-y-6 text-center text-white font-bold animate-in fade-in slide-in-from-top-4">
          {menuItems.map((item) => (
            <HashLink 
              key={item.name}
              smooth 
              to={item.path}
              replace={true} // KUNCI UTAMA: Mengganti riwayat, bukan menambah 
              onClick={() => setIsOpen(false)}
              className="text-lg hover:text-amber-500 transition-colors"
            >
              {item.name}
            </HashLink>
          ))}
        </div>
      )}
    </nav>
  );
}