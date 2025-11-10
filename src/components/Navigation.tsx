import { Home, ShoppingBag, Tag, User, Menu, X, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import telcorecoLogo from 'figma:asset/94b9eb913c63316a08244d80187b377cb4bef1e0.png';
import { CartSheet, CartItem } from './CartSheet';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  cartItems: CartItem[];
  onUpdateCartQuantity: (id: string, quantity: number) => void;
  onRemoveCartItem: (id: string) => void;
  onCartCheckout: () => void;
}

export function Navigation({ 
  currentPage, 
  onNavigate, 
  isLoggedIn, 
  cartItems, 
  onUpdateCartQuantity, 
  onRemoveCartItem, 
  onCartCheckout 
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'categories', label: 'Produk', icon: ShoppingBag },
    { id: 'promo', label: 'Promo', icon: Tag },
  ];

  const privateNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'categories', label: 'Produk', icon: ShoppingBag },
    { id: 'promo', label: 'Promo', icon: Tag },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  const navItems = isLoggedIn ? privateNavItems : publicNavItems;

  return (
    <nav className="bg-[#0D3B66] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'home')}>
            <div className="flex items-center gap-3">
              <img src={telcorecoLogo} alt="Telcoreco Logo" className="h-10 w-10 transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                  Telcoreco
                </span>
                <span className="text-[9px] tracking-widest text-[#F95738] uppercase -mt-1">
                  Connect & Recommend
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#F95738] text-white'
                      : 'text-gray-200 hover:bg-[#1a4d7f]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            
            {/* Cart */}
            <CartSheet
              cartItems={cartItems}
              onUpdateQuantity={onUpdateCartQuantity}
              onRemoveItem={onRemoveCartItem}
              onCheckout={onCartCheckout}
              isLoggedIn={isLoggedIn}
            />
            
            {!isLoggedIn && (
              <Button
                onClick={() => onNavigate('login')}
                className="bg-[#F95738] hover:bg-[#e04628]"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            )}
          </div>

          {/* Mobile Cart & Menu */}
          <div className="md:hidden flex items-center gap-2">
            <CartSheet
              cartItems={cartItems}
              onUpdateQuantity={onUpdateCartQuantity}
              onRemoveItem={onRemoveCartItem}
              onCheckout={onCartCheckout}
              isLoggedIn={isLoggedIn}
            />
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#F95738] text-white'
                      : 'text-gray-200 hover:bg-[#1a4d7f]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
            {!isLoggedIn && (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-[#F95738] text-white hover:bg-[#e04628]"
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
