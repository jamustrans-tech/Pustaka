import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { books } from '../data/books';

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.8 }
  }
};

export default function BookGrid() {
  // Filter hanya buku yang memiliki isDiscount: true
  const discountBooks = books.filter(book => book.isDiscount);

  return (
    <section id="koleksi-buku" className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Efek Cahaya Dekoratif Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full -mr-64 -mt-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-3 py-1 bg-red-600/20 border border-red-500/50 text-red-500 text-xs font-bold rounded-full uppercase tracking-widest animate-pulse">
                Limited Time Offer
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              FLASH <span className="text-amber-500">SALE.</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Jangan lewatkan penawaran eksklusif minggu ini. Koleksi terbaik dengan harga promo.
            </p>
          </div>

          {/* Button Lihat Semua - Desain Solid & Mencolok Tanpa Hover */}
          <Link 
            to="/koleksi"
            replace={true} // KUNCI UTAMA: Mengganti riwayat, bukan menambah 
            className="relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black uppercase tracking-tighter rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.3)] border-b-4 border-amber-700 active:translate-y-1 active:border-b-0 transition-all duration-100"
          >
            <span className="text-sm md:text-base">Lihat Semua Koleksi</span>
            <div className="bg-black/10 p-1 rounded-lg">
              <ArrowRight size={22} />
            </div>
            
            {/* Elemen Dekoratif: Titik Berkedip Kecil */}
            <span className="absolute -top-2 -right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-[#0a0a0a]"></span>
            </span>
          </Link>
        </div>

        {/* Grid Buku Diskon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {discountBooks.map((book) => (
            <motion.div 
              key={book.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl transition-all duration-500 shadow-2xl bg-gradient-to-br from-red-950 via-black to-black border border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.15)]">
                
                {/* Badge Sale Besar & Bounce */}
                <div className="absolute top-6 left-6 z-20 bg-red-600 text-white text-xs md:text-sm font-black px-5 py-2 rounded-full uppercase tracking-tighter shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-white/20 animate-bounce">
                  Sale {book.discountLabel}
                </div>

                <img 
                  src={book.img} 
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 grayscale-[20%] group-hover:grayscale-0" 
                />
                
                <div className="absolute inset-0 opacity-80 bg-gradient-to-t from-red-950 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <p className="text-amber-500 font-bold text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles size={14} /> Special Offer
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {book.title}
                  </h3>

                  <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-400 line-through decoration-red-500 mb-1">
                        {book.originalPrice}
                      </span>
                      <span className="font-black text-white text-3xl">
                        {book.price}
                      </span>
                    </div>

                    <a 
                      href={`https://wa.me/6285800372731?text=${encodeURIComponent(
                        `${window.location.href}\n\n` + 
                        `Halo Admin, saya ingin memesan produk FLASH SALE:\n\n` +
                        `*Judul:* ${book.title}\n` +
                        `*Harga Promo:* ${book.price}\n\n` +
                        `Mohon informasi selanjutnya.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl shadow-lg transition-all transform hover:scale-110 bg-white text-red-600"
                    >
                      <ShoppingCart size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}