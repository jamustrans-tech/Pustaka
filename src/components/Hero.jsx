import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HashLink } from 'react-router-hash-link'; // Tambahkan import ini

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layer 1: Background (Paling Lambat)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  // Layer 2: Elemen Dekorasi (Sedikit lebih cepat)
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  // Layer 3: Konten Utama (Paling Cepat)
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  return (
    /* TAMBAHKAN id="home" DI SINI agar Navbar bisa menemukannya */
    <section id="home" ref={ref} className="relative h-[120vh] w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      
      {/* LAYER 1: Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600')`,
          y: bgY,
          scale: 1.1
        }}
      />

      {/* LAYER 2: Dekorasi Melayang */}
      <motion.div 
        style={{ y: decoY }}
        className="absolute top-1/4 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-[120px] z-1"
      />
      <motion.div 
        style={{ y: decoY, x: 50 }}
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] z-1"
      />

      {/* LAYER 3: Konten Utama */}
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-amber-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
        >
          Premium Digital Collection
        </motion.span>
        
        <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8">
          UNFOLD <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-700">
            THE WORLDS
          </span>
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* UBAH ke HashLink agar tombol ini juga sakti di halaman mana pun */}
          <HashLink 
            smooth
            to="/#koleksi-buku" 
            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-amber-500 transition-all duration-300 inline-block text-center"
          >
            Jelajahi Koleksi
          </HashLink>
        </div>
      </motion.div>

      {/* Fade out ke section selanjutnya */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20" />
    </section>
  );
}