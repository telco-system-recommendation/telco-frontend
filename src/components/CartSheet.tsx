import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, Package, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSheetProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isLoggedIn: boolean;
}

export function CartSheet({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, isLoggedIn }: CartSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsOpen(false);
    onCheckout();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button 
          className="relative p-2 text-white hover:bg-[#1a4d7f] rounded-md transition-colors"
          title={isLoggedIn ? "Keranjang Belanja" : "Login untuk melihat keranjang"}
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#F95738] border-none text-xs">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        {/* Header */}
        <div className="px-6 py-5 border-b bg-gradient-to-r from-[#0D3B66] to-[#1a4d7f]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg">Keranjang Belanja</div>
                {totalItems > 0 && isLoggedIn && (
                  <div className="text-sm text-white/80 font-normal">
                    {totalItems} item
                  </div>
                )}
              </div>
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg text-gray-700 mb-2">Login Diperlukan</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Silakan login terlebih dahulu untuk menambahkan produk ke keranjang
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg text-gray-700 mb-2">Keranjang Kosong</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Belum ada produk di keranjang. Yuk, mulai belanja!
                </p>
              </div>
            ) : (
              <AnimatePresence>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-[#0D3B66]/5 to-[#F95738]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-8 h-8 text-[#0D3B66]/40" />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#0D3B66] mb-1 truncate pr-2">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-3">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                              <button
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 text-sm font-medium min-w-[50px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                              title="Hapus item"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-[#0D3B66] font-medium">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>

          {/* Cart Summary */}
          {isLoggedIn && cartItems.length > 0 && (
            <div className="border-t bg-gray-50/50 px-6 py-5 space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pajak (11%)</span>
                  <span className="text-gray-900">Rp {Math.round(tax).toLocaleString('id-ID')}</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Total */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900">Total</span>
                <span className="text-2xl text-[#F95738]">
                  Rp {Math.round(total).toLocaleString('id-ID')}
                </span>
              </div>

              {/* Checkout Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-[#F95738] to-[#e04628] hover:from-[#e04628] hover:to-[#F95738] h-12 text-base shadow-lg group"
                >
                  Checkout Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
