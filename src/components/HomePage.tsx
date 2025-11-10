import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, Wifi, Tv, Globe, Sparkles, ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  const categories = [
    {
      id: 'pulsa',
      title: 'Pulsa & Nelpon',
      description: 'Paket pulsa dan telepon',
      icon: Phone,
      color: 'bg-blue-500',
    },
    {
      id: 'data',
      title: 'Kuota Data',
      description: 'Paket internet unlimited',
      icon: Wifi,
      color: 'bg-green-500',
    },
    {
      id: 'streaming',
      title: 'Streaming',
      description: 'Platform hiburan digital',
      icon: Tv,
      color: 'bg-purple-500',
    },
    {
      id: 'roaming',
      title: 'Roaming',
      description: 'Paket internasional',
      icon: Globe,
      color: 'bg-orange-500',
    },
  ];

  const featuredProducts = [
    {
      id: 'p1',
      name: 'Paket Hemat 10GB',
      price: 50000,
      description: '10GB + bonus streaming',
      popular: true,
    },
    {
      id: 'p2',
      name: 'Netflix Premium',
      price: 186000,
      description: '4K Ultra HD, 4 layar',
      popular: false,
    },
    {
      id: 'p3',
      name: 'Paket Super 25GB',
      price: 100000,
      description: '25GB + unlimited sosmed',
      popular: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D3B66] to-[#1a4d7f] text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbmV0d29yayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzYyMTUyMTU4fDA&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated Signal Waves */}
        <motion.div
          className="absolute top-1/4 left-0 w-full h-64 opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 1200 300" className="w-full h-full">
            <motion.path
              d="M0,150 Q300,50 600,150 T1200,150"
              fill="none"
              stroke="white"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <motion.div
                className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F95738] via-[#ff6b4a] to-[#F95738] rounded-full mb-6 shadow-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(249, 87, 56, 0.3)",
                    "0 0 30px rgba(249, 87, 56, 0.5)",
                    "0 0 20px rgba(249, 87, 56, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                  },
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
                
                {/* Text */}
                <span className="relative z-10 text-white text-sm font-medium tracking-wide">
                  Platform Rekomendasi Produk Digital
                </span>
                
                {/* Decorative dot */}
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-6xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Solusi Telekomunikasi Terbaik untuk Anda
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Temukan paket pulsa, data, streaming, dan roaming yang sesuai dengan kebutuhan Anda dengan harga terbaik
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-[#F95738] hover:bg-[#e04628] text-white relative overflow-hidden group"
                  onClick={() => onNavigate('categories')}
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    initial={false}
                    animate={{ scale: [0, 2] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <span className="relative z-10">Lihat Semua Produk</span>
                  <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-[#0D3B66]"
                  onClick={() => onNavigate('promo')}
                >
                  Lihat Promo
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl mb-4 text-[#0D3B66]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mengapa Memilih Telcoreco?
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Platform terpercaya untuk kebutuhan telekomunikasi digital Anda
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Rekomendasi Personal */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="pt-10 pb-8 px-6 text-center relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    animate={{
                      boxShadow: [
                        "0 4px 6px rgba(59, 130, 246, 0.1)",
                        "0 8px 16px rgba(59, 130, 246, 0.2)",
                        "0 4px 6px rgba(59, 130, 246, 0.1)",
                      ],
                    }}
                    style={{
                      transition: "box-shadow 2s ease-in-out",
                    }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-9 h-9 text-blue-600 relative z-10" />
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-xl mb-3 text-[#0D3B66]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Rekomendasi Personal
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Dapatkan saran produk yang sesuai dengan kebiasaan dan preferensi Anda
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 2 - Harga Terbaik */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="pt-10 pb-8 px-6 text-center relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    animate={{
                      boxShadow: [
                        "0 4px 6px rgba(34, 197, 94, 0.1)",
                        "0 8px 16px rgba(34, 197, 94, 0.2)",
                        "0 4px 6px rgba(34, 197, 94, 0.1)",
                      ],
                    }}
                    style={{
                      transition: "box-shadow 2s ease-in-out",
                    }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 bg-green-400 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Check className="w-9 h-9 text-green-600 relative z-10 stroke-[3]" />
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-xl mb-3 text-[#0D3B66]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Harga Terbaik
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Bandingkan harga dan temukan penawaran terbaik untuk setiap produk
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Card 3 - Proses Cepat */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group">
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="pt-10 pb-8 px-6 text-center relative z-10">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    animate={{
                      boxShadow: [
                        "0 4px 6px rgba(249, 115, 22, 0.1)",
                        "0 8px 16px rgba(249, 115, 22, 0.2)",
                        "0 4px 6px rgba(249, 115, 22, 0.1)",
                      ],
                    }}
                    style={{
                      transition: "box-shadow 2s ease-in-out",
                    }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 bg-orange-400 rounded-full"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-9 h-9 text-orange-600 relative z-10 stroke-[2.5]" />
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="text-xl mb-3 text-[#0D3B66]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    Proses Cepat
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Pembelian mudah dan aktivasi instan untuk semua produk digital
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-[#0D3B66]">Jelajahi Kategori</h2>
            <p className="text-gray-600">Pilih kategori produk sesuai kebutuhan Anda</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <Card
                    className="hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                    onClick={() => {
                      onNavigate('categories');
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <CardHeader className="relative z-10">
                      <motion.div 
                        className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 relative`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white rounded-xl opacity-0"
                          whileHover={{ scale: 1.5, opacity: 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                        <Icon className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center text-[#F95738] group-hover:gap-2 transition-all">
                        <span className="text-sm">Lihat Produk</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-[#0D3B66]">Produk Populer</h2>
            <p className="text-gray-600">Paket pilihan yang paling banyak diminati</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="hover:shadow-xl transition-shadow relative group h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#0D3B66]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {product.popular && (
                    <motion.div 
                      className="absolute top-3 right-3 z-10"
                      initial={{ rotate: -15 }}
                      animate={{ rotate: 0 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Badge className="bg-[#F95738] shadow-lg">Populer</Badge>
                    </motion.div>
                  )}
                  <CardHeader className="relative z-10">
                    <CardTitle>{product.name}</CardTitle>
                    <motion.div 
                      className="text-2xl text-[#F95738] mt-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      Rp {product.price.toLocaleString('id-ID')}
                    </motion.div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full bg-[#0D3B66] hover:bg-[#1a4d7f] relative overflow-hidden group"
                        onClick={() => onNavigate('categories')}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                          initial={false}
                        />
                        <span className="relative z-10">Lihat Detail</span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0D3B66] to-[#1a4d7f] text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full opacity-5"
          animate={{
            scale: [1, 1.5, 1],
            x: [-50, 50, -50],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#F95738] rounded-full opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            x: [50, -50, 50],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Siap Untuk Memulai?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Daftar sekarang dan dapatkan rekomendasi produk yang dipersonalisasi khusus untuk Anda
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-[#F95738] hover:bg-[#e04628] text-white relative overflow-hidden group shadow-xl"
              onClick={() => onNavigate('signup')}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
              <span className="relative z-10">Daftar Gratis</span>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
