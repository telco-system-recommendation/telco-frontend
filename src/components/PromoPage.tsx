import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Percent, Clock, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface PromoPageProps {
  onNavigate: (page: string) => void;
}

export function PromoPage({ onNavigate }: PromoPageProps) {
  const promos = [
    {
      id: 'promo1',
      title: 'Diskon 30% Paket Data',
      description: 'Dapatkan diskon 30% untuk semua paket data di atas 20GB',
      image: 'https://images.unsplash.com/photo-1760531963397-53ea8619a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkYXRhJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '30%',
      validUntil: '30 November 2025',
      type: 'Data',
    },
    {
      id: 'promo2',
      title: 'Beli 1 Gratis 1 Pulsa',
      description: 'Pembelian pulsa Rp 100.000 gratis pulsa Rp 50.000',
      image: 'https://images.unsplash.com/photo-1511233744044-194342066754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlY29tbXVuaWNhdGlvbnMlMjB0b3dlcnxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '50%',
      validUntil: '15 November 2025',
      type: 'Pulsa',
    },
    {
      id: 'promo3',
      title: 'Streaming Premium Hemat',
      description: 'Paket bundling Netflix + Spotify dengan harga spesial',
      image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbmV0d29yayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYyMTUyMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      discount: '25%',
      validUntil: '31 Desember 2025',
      type: 'Streaming',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-[#F95738] text-white px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm">Promo Spesial</span>
          </motion.div>
          <h1 className="text-3xl md:text-4xl mb-4 text-[#0D3B66]">Promo Terbaru</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jangan lewatkan penawaran menarik untuk produk telekomunikasi favorit Anda
          </p>
        </motion.div>

        {/* Featured Promo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-8 overflow-hidden bg-gradient-to-r from-[#0D3B66] to-[#1a4d7f] text-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <CardContent className="p-8 flex flex-col justify-center">
              <Badge className="bg-[#F95738] w-fit mb-4">Promo Eksklusif</Badge>
              <h2 className="text-3xl mb-4">Flash Sale Weekend!</h2>
              <p className="mb-6 opacity-90">
                Dapatkan diskon hingga 50% untuk semua produk setiap akhir pekan
              </p>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Berakhir dalam 2 hari 5 jam</span>
              </div>
              <Button
                className="bg-[#F95738] hover:bg-[#e04628] w-fit"
                onClick={() => onNavigate('categories')}
              >
                Belanja Sekarang
              </Button>
            </CardContent>
            <div className="hidden md:block relative h-64 md:h-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbmV0d29yayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYyMTUyMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Flash Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
        </motion.div>

        {/* Promo List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="relative h-48">
                <ImageWithFallback
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-[#F95738] text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    <span className="text-sm">{promo.discount}</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white text-[#0D3B66]">{promo.type}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{promo.title}</CardTitle>
                <CardDescription>{promo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Berlaku hingga {promo.validUntil}</span>
                </div>
                <Button
                  className="w-full bg-[#0D3B66] hover:bg-[#1a4d7f]"
                  onClick={() => onNavigate('categories')}
                >
                  Gunakan Promo
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gray-100">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl mb-2 text-[#0D3B66]">Ingin mendapatkan promo eksklusif?</h3>
            <p className="text-gray-600 mb-6">
              Dapatkan notifikasi promo terbaru langsung ke email Anda
            </p>
            <Button className="bg-[#F95738] hover:bg-[#e04628]">
              Berlangganan Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
