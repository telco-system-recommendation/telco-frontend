import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Phone, Wifi, Tv, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryPageProps {
  onSelectCategory: (category: string) => void;
  requireAuth: (action: () => void, message?: string) => void;
}

export function CategoryPage({ onSelectCategory, requireAuth }: CategoryPageProps) {
  const categories = [
    {
      id: 'pulsa',
      title: 'Pulsa & Nelpon',
      description: 'Paket pulsa dan telepon untuk kebutuhan komunikasi',
      icon: Phone,
      color: 'bg-blue-500',
    },
    {
      id: 'data',
      title: 'Kuota Data',
      description: 'Paket internet untuk browsing dan streaming',
      icon: Wifi,
      color: 'bg-green-500',
    },
    {
      id: 'streaming',
      title: 'Streaming Subscription',
      description: 'Akses ke platform hiburan digital favorit',
      icon: Tv,
      color: 'bg-purple-500',
    },
    {
      id: 'roaming',
      title: 'Roaming',
      description: 'Paket roaming internasional untuk perjalanan',
      icon: Globe,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl mb-4 text-[#0D3B66]">Pilih Kategori Produk</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk telekomunikasi yang sesuai dengan kebutuhan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader>
                  <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => requireAuth(() => onSelectCategory(category.id), 'Login atau daftar untuk melihat produk')}
                    className="w-full bg-[#0D3B66] hover:bg-[#1a4d7f]"
                  >
                    Lihat Produk
                  </Button>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
