import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, Clock, Zap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProductById } from './products-data';
import { motion } from 'motion/react';

interface ProductDetailPageProps {
  productId: string;
  onAddToCart: (productName: string, productPrice: number) => void;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onAddToCart, onBack }: ProductDetailPageProps) {
  // Get product by ID
  const product = getProductById(productId);

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl mb-4 text-[#0D3B66]">Produk Tidak Ditemukan</h1>
          <Button onClick={onBack} className="bg-[#0D3B66] hover:bg-[#1a4d7f]">
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const categoryNames: Record<string, string> = {
    pulsa: 'Pulsa & Nelpon',
    data: 'Kuota Data',
    streaming: 'Streaming Subscription',
    roaming: 'Roaming',
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
              <ImageWithFallback
                src={product.image || 'https://images.unsplash.com/photo-1760531963397-53ea8619a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkYXRhJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.popular && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-[#F95738] text-white px-4 py-2">Paket Populer</Badge>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <Badge className="mb-2">{categoryNames[product.category] || product.category}</Badge>
              <h1 className="text-3xl md:text-4xl mb-2 text-[#0D3B66]">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="bg-gradient-to-r from-[#0D3B66] to-[#1a4d7f] text-white p-6 rounded-xl">
              <div className="text-sm opacity-90 mb-1">Harga</div>
              <div className="text-4xl">Rp {product.price.toLocaleString('id-ID')}</div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4">
              {product.details?.speed && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-[#F95738]" />
                    <div className="text-sm text-gray-600">Kecepatan</div>
                    <div className="text-xs mt-1">{product.details.speed}</div>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-[#F95738]" />
                  <div className="text-sm text-gray-600">Masa Aktif</div>
                  <div className="text-xs mt-1">{product.details?.validity || 'N/A'}</div>
                </CardContent>
              </Card>
              {product.details?.quota && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-[#F95738]" />
                    <div className="text-sm text-gray-600">Kuota</div>
                    <div className="text-xs mt-1">{product.details.quota}</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Fitur Paket</CardTitle>
                <CardDescription>Keuntungan yang Anda dapatkan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Button
              onClick={() => onAddToCart(product.name, product.price)}
              className="w-full bg-[#F95738] hover:bg-[#e04628] text-white py-6 text-lg"
            >
              Tambah ke Keranjang
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
