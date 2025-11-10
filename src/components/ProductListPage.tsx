import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Check } from 'lucide-react';
import { productsData } from './products-data';
import { motion } from 'motion/react';

interface ProductListPageProps {
  category: string;
  onSelectProduct: (productId: string, productName: string, productPrice: number) => void;
  onBack: () => void;
}

export function ProductListPage({ category, onSelectProduct, onBack }: ProductListPageProps) {
  const filteredProducts = productsData.filter(p => p.category === category);

  const categoryNames: Record<string, string> = {
    pulsa: 'Pulsa & Nelpon',
    data: 'Kuota Data',
    streaming: 'Streaming Subscription',
    roaming: 'Roaming',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Kategori
          </Button>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl md:text-4xl mb-2 text-[#0D3B66]">
            {categoryNames[category]}
          </h1>
          <p className="text-gray-600">
            Pilih paket yang sesuai dengan kebutuhan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="hover:shadow-lg transition-shadow relative h-full">
              {product.popular && (
                <div className="absolute -top-3 -right-3">
                  <Badge className="bg-[#F95738]">Populer</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <div className="text-2xl text-[#F95738] mt-2">
                  Rp {product.price.toLocaleString('id-ID')}
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => onSelectProduct(product.id, product.name, product.price)}
                  className="w-full bg-[#0D3B66] hover:bg-[#1a4d7f]"
                >
                  Beli Sekarang
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
