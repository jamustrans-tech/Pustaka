import { motion } from 'framer-motion';
import { BookOpen, Users, Trophy, ShieldCheck } from 'lucide-react';

const stats = [
  { id: 1, icon: <BookOpen />, label: "Koleksi Buku", value: "1000+" },
  { id: 2, icon: <Users />, label: "Pembaca Aktif", value: "50k+" },
  { id: 3, icon: <Trophy />, label: "Penghargaan", value: "12" },
  { id: 4, icon: <ShieldCheck />, label: "Transaksi Aman", value: "100%" },
];

export default function About() {
  return (
    <section id="tentang" className="relative bg-[#0a0a0a] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">
              Mengenal Pustaka Elite
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Lebih Dari Sekadar <br /> 
              <span className="text-gray-500">Rak Buku Digital.</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Kami percaya bahwa setiap halaman adalah pintu menuju dimensi baru. Pustaka Elite hadir sebagai kurator literatur komersial kelas dunia, memudahkan Anda mengakses ilmu pengetahuan dan hiburan berkualitas tinggi hanya dalam satu genggaman.
            </p>
            <div className="flex gap-4">
              <div className="h-1 w-20 bg-amber-500 rounded-full" />
              <div className="h-1 w-10 bg-amber-500/30 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.id * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:bg-white/10 transition-colors group"
            >
              <div className="text-amber-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-3xl font-black text-white mb-1">{item.value}</h4>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter">{item.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}