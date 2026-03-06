import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Search, Filter } from 'lucide-react';
import { books } from '../data/books'; // Pastikan path data buku benar

export default function FullCollection() {
  const [filter, setFilter] = useState('Semua');
  
  // Contoh kategori, sesuaikan dengan data books Anda
  const categories = ['Semua', 'Productivity', 'Self Dev', 'Finance', 'Fiction'];

  const filteredBooks = filter === 'Semua' 
    ? books 
    : books.filter(book => book.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#0a0a0a] min-h-screen pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Back Button */}
        <div className="mb-12">
          <Link 
            to="/" 
            replace={true} // KUNCI UTAMA: Mengganti riwayat, bukan menambah
            className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            SEMUA <span className="text-amber-500">KOLEKSI.</span>
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          <div className="flex items-center gap-2 text-gray-400 mr-4">
            <Filter size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredBooks.map((book) => (
              <motion.div
                layout
                key={book.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={book.img} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {book.isDiscount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      Sale {book.discountLabel}
                    </div>
                  )}
                </div>

                {/* Info Container */}
                <div className="p-6">
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                    {book.category}
                </p>
                <h3 className="text-white font-bold text-lg mb-4 line-clamp-1 group-hover:text-amber-500 transition-colors">
                    {book.title}
                </h3>
                
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                    {book.isDiscount && (
                        <span className="text-xs text-gray-500 line-through">{book.originalPrice}</span>
                    )}
                    <span className="text-white font-black">{book.price}</span>
                    </div>

                    {/* Tombol WhatsApp dengan warna yang disesuaikan */}
                    <a 
                    href={`https://wa.me/6285800372731?text=${encodeURIComponent(
                        `Halo Admin, saya ingin memesan buku:\n\n*Judul:* ${book.title}\n*Harga:* ${book.price}\n\nMohon informasi selanjutnya.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl shadow-lg transition-all transform hover:scale-110 ${
                        book.isDiscount 
                        ? 'bg-white text-red-600' // Tetap putih untuk item diskon agar kontras
                        : 'bg-amber-500 text-black' // Menggunakan Amber & Hitam sesuai halaman Koleksi
                    }`}
                    >
                    <ShoppingCart size={18} />
                    </a>
                </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl font-medium text-italic">Tidak ada buku dalam kategori ini.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}