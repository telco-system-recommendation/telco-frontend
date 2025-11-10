import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LoadingPage } from './components/LoadingPage';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { UserFormPage } from './components/UserFormPage';
import { CategoryPage } from './components/CategoryPage';
import { ProductListPage } from './components/ProductListPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DashboardPage } from './components/DashboardPage';
import { PromoPage } from './components/PromoPage';
import { ProfilePage } from './components/ProfilePage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { CartItem } from './components/CartSheet';

type Page = 
  | 'home'
  | 'login'
  | 'signup'
  | 'userform'
  | 'categories'
  | 'products'
  | 'productDetail'
  | 'checkout'
  | 'dashboard'
  | 'promo'
  | 'profile';

export interface Transaction {
  id: string;
  product: string;
  date: string;
  price: number;
  status: 'completed' | 'pending' | 'failed';
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedProductName, setSelectedProductName] = useState<string>('');
  const [selectedProductPrice, setSelectedProductPrice] = useState<number>(0);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userPreference, setUserPreference] = useState<string>('all');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadUserTransactions = (email: string) => {
    const savedTransactions = localStorage.getItem(`telcoreco_transactions_${email}`);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions([]);
    }
  };

  const saveUserTransactions = (email: string, transactions: Transaction[]) => {
    localStorage.setItem(`telcoreco_transactions_${email}`, JSON.stringify(transactions));
  };

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    loadUserTransactions(email);
    setCurrentPage('userform');
    toast.success('Berhasil masuk!');
    
    // Execute pending action after login
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 500);
    }
  };

  const handleSignUp = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    // New user, no transactions yet
    setTransactions([]);
    setCurrentPage('userform');
    toast.success('Akun berhasil dibuat!');
    
    // Execute pending action after signup
    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 500);
    }
  };

  const handleUserFormComplete = (userData: { name: string; phone: string; preference: string }) => {
    setUserName(userData.name);
    setUserPreference(userData.preference);
    setCurrentPage('dashboard');
    toast.success('Profil berhasil dilengkapi!');
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  const handleSelectProduct = (productId: string, productName: string, productPrice: number) => {
    setSelectedProduct(productId);
    
    // Require login before proceeding to checkout
    requireAuth(() => {
      // Add product to cart
      const existingItem = cartItems.find(item => item.name === productName);
      
      let updatedCartItems: CartItem[];
      
      if (existingItem) {
        // Update quantity if item already exists
        updatedCartItems = cartItems.map(item =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
        toast.success('Jumlah produk diperbarui!');
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now().toString(),
          name: productName,
          price: productPrice,
          quantity: 1,
        };
        updatedCartItems = [...cartItems, newItem];
        setCartItems(updatedCartItems);
        toast.success('Produk ditambahkan!');
      }
      
      // Go directly to checkout
      const total = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setSelectedProductName(updatedCartItems.map(item => `${item.name} (${item.quantity}x)`).join(', '));
      setSelectedProductPrice(total);
      setCurrentPage('checkout');
    }, 'Login atau daftar untuk melanjutkan pembelian');
  };

  const requireAuth = (action: () => void, message?: string) => {
    if (!isLoggedIn) {
      setPendingAction(() => action);
      setShowLoginDialog(true);
      if (message) {
        toast.info(message);
      } else {
        toast.info('Silakan masuk terlebih dahulu');
      }
      return;
    }
    action();
  };

  const handleAddToCart = (productName: string, productPrice: number) => {
    // Require login before adding to cart
    requireAuth(() => {
      const existingItem = cartItems.find(item => item.name === productName);
      
      let updatedCartItems: CartItem[];
      
      if (existingItem) {
        // Update quantity if item already exists
        updatedCartItems = cartItems.map(item =>
          item.name === productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
        toast.success('Jumlah produk diperbarui!');
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now().toString(),
          name: productName,
          price: productPrice,
          quantity: 1,
        };
        updatedCartItems = [...cartItems, newItem];
        setCartItems(updatedCartItems);
        toast.success('Produk ditambahkan ke keranjang!');
      }
      
      // Redirect to checkout immediately after adding to cart
      setTimeout(() => {
        const total = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setSelectedProductName(updatedCartItems.map(item => `${item.name} (${item.quantity}x)`).join(', '));
        setSelectedProductPrice(total);
        setCurrentPage('checkout');
      }, 500);
    }, 'Login atau daftar untuk menambahkan produk ke keranjang');
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('Produk dihapus dari keranjang');
  };

  const handleCartCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Keranjang Anda kosong');
      return;
    }
    
    // User is already logged in if they have items in cart
    // Calculate total for all items
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSelectedProductName(cartItems.map(item => `${item.name} (${item.quantity}x)`).join(', '));
    setSelectedProductPrice(total);
    setCurrentPage('checkout');
  };

  const handleCheckoutComplete = () => {
    // Create new transactions from cart items
    const newTransactions: Transaction[] = cartItems.map(item => ({
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      product: item.name,
      date: new Date().toISOString().split('T')[0],
      price: item.price * item.quantity,
      status: 'completed' as const,
    }));

    // Add to existing transactions
    const updatedTransactions = [...newTransactions, ...transactions];
    setTransactions(updatedTransactions);
    
    // Save to localStorage for this user
    if (userEmail) {
      saveUserTransactions(userEmail, updatedTransactions);
    }

    // Clear cart after successful checkout
    setCartItems([]);
    setCurrentPage('dashboard');
    toast.success('Pembayaran berhasil! Terima kasih atas pembelian Anda.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
    toast.info('Anda telah keluar');
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleNavigate = (page: string) => {
    // Protected pages
    if ((page === 'dashboard' || page === 'profile') && !isLoggedIn) {
      setPendingAction(() => () => setCurrentPage(page as Page));
      setShowLoginDialog(true);
      toast.info('Silakan masuk terlebih dahulu');
      return;
    }

    if (page === 'categories') {
      setCurrentPage('categories');
    } else if (page === 'dashboard') {
      setCurrentPage('dashboard');
    } else if (page === 'promo') {
      setCurrentPage('promo');
    } else if (page === 'profile') {
      setCurrentPage('profile');
    } else if (page === 'login') {
      setCurrentPage('login');
    } else if (page === 'signup') {
      setCurrentPage('signup');
    } else if (page === 'home') {
      setCurrentPage('home');
    }
  };

  const handleLoginFromDialog = () => {
    setShowLoginDialog(false);
    setCurrentPage('login');
  };

  const handleBuyFromDashboard = (productName: string, productPrice: number) => {
    // Add product to cart
    const existingItem = cartItems.find(item => item.name === productName);
    
    let updatedCartItems: CartItem[];
    
    if (existingItem) {
      // Update quantity if item already exists
      updatedCartItems = cartItems.map(item =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
      toast.success('Jumlah produk diperbarui!');
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        name: productName,
        price: productPrice,
        quantity: 1,
      };
      updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      toast.success('Produk ditambahkan!');
    }
    
    // Go directly to checkout
    const total = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSelectedProductName(updatedCartItems.map(item => `${item.name} (${item.quantity}x)`).join(', '));
    setSelectedProductPrice(total);
    setCurrentPage('checkout');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} onNavigate={handleNavigate} />;
      case 'userform':
        return <UserFormPage onComplete={handleUserFormComplete} />;
      case 'categories':
        return <CategoryPage onSelectCategory={handleSelectCategory} requireAuth={requireAuth} />;
      case 'products':
        return (
          <ProductListPage
            category={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onBack={() => setCurrentPage('categories')}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailPage
            productId={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('products')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            onComplete={handleCheckoutComplete}
            onBack={() => setCurrentPage(isLoggedIn ? 'dashboard' : 'home')}
            productName={selectedProductName}
            productPrice={selectedProductPrice}
            cartItems={cartItems}
          />
        );
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} userPreference={userPreference} userName={userName} onBuyProduct={handleBuyFromDashboard} transactions={transactions} />;
      case 'promo':
        return <PromoPage onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <ProfilePage 
            onNavigate={handleNavigate} 
            userName={userName}
            userPreference={userPreference}
            onUpdatePreference={(newPreference) => {
              setUserPreference(newPreference);
            }}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Show loading page
  if (isLoading) {
    return <LoadingPage onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        cartItems={cartItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onCartCheckout={handleCartCheckout}
      />
      <main className="flex-1 w-full">
        {renderPage()}
      </main>
      <Footer />
      <Toaster position="top-right" />

      {/* Login Required Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#0D3B66]">Login Diperlukan</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Untuk menambahkan produk ke keranjang dan melakukan pembelian, Anda perlu masuk terlebih dahulu.
          </DialogDescription>
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={handleLoginFromDialog}
              className="w-full px-4 py-3 bg-[#0D3B66] text-white rounded-md hover:bg-[#1a4d7f] transition-colors font-medium"
            >
              Masuk ke Akun
            </button>
            <button
              onClick={() => {
                setShowLoginDialog(false);
                setCurrentPage('signup');
              }}
              className="w-full px-4 py-3 bg-[#F95738] text-white rounded-md hover:bg-[#e04628] transition-colors font-medium"
            >
              Daftar Akun Baru
            </button>
            <button
              onClick={() => {
                setShowLoginDialog(false);
                setPendingAction(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
            >
              Batal
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
