import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, CreditCard, Smartphone, Building2, Check, Phone, MapPin, User, Mail, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { CartItem } from './CartSheet';
import { motion } from 'motion/react';

interface CheckoutPageProps {
  onComplete: () => void;
  onBack: () => void;
  productName?: string;
  productPrice?: number;
  cartItems?: CartItem[];
}

export function CheckoutPage({ onComplete, onBack, productName, productPrice, cartItems = [] }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedEwallet, setSelectedEwallet] = useState('');
  
  // Contact Info
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Address Info
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  // Payment Details
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Use cart items if available, otherwise use single product
  const items = cartItems.length > 0 ? cartItems : [{
    id: '1',
    name: productName || 'Paket Hemat 10GB',
    price: productPrice || 50000,
    quantity: 1,
  }];

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const validateStep1 = () => {
    if (!phoneNumber || !email || !fullName) {
      toast.error('Mohon lengkapi semua informasi kontak');
      return false;
    }
    if (phoneNumber.length < 10) {
      toast.error('Nomor telepon tidak valid');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!paymentMethod) {
      toast.error('Mohon pilih metode pembayaran');
      return false;
    }
    
    if (paymentMethod === 'credit') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Mohon lengkapi informasi kartu');
        return false;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Nomor kartu harus 16 digit');
        return false;
      }
    }
    
    if (paymentMethod === 'transfer' && !selectedBank) {
      toast.error('Mohon pilih bank');
      return false;
    }
    
    if (paymentMethod === 'ewallet' && !selectedEwallet) {
      toast.error('Mohon pilih e-wallet');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      onComplete();
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        <h1 className="text-3xl md:text-4xl mb-2 text-[#0D3B66]">Checkout</h1>
        <p className="text-gray-600 mb-8">Lengkapi informasi untuk menyelesaikan pembelian</p>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#0D3B66]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#0D3B66] text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="hidden sm:inline">Informasi Kontak</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#0D3B66]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#0D3B66] text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="hidden sm:inline">Pembayaran</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Informasi Kontak
                    </CardTitle>
                    <CardDescription>
                      Nomor telepon ini akan digunakan untuk aktivasi paket
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Lengkap *</Label>
                        <Input
                          id="fullName"
                          placeholder="Masukkan nama lengkap"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="phone"
                            placeholder="08xx xxxx xxxx"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="pl-10"
                            maxLength={15}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Paket akan diaktifkan ke nomor ini</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Informasi Pengiriman
                    </CardTitle>
                    <CardDescription>
                      Opsional - untuk pengiriman kartu SIM fisik
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Alamat Lengkap</Label>
                        <Input
                          id="address"
                          placeholder="Jl. Contoh No. 123"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Kota</Label>
                          <Input
                            id="city"
                            placeholder="Jakarta"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal">Kode Pos</Label>
                          <Input
                            id="postal"
                            placeholder="12345"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            maxLength={5}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    onClick={handleNext}
                    className="w-full bg-[#F95738] hover:bg-[#e04628] py-6"
                  >
                    Lanjut ke Pembayaran
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                </motion.div>
              </>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                  <CardHeader>
                    <CardTitle>Metode Pembayaran</CardTitle>
                    <CardDescription>Pilih metode pembayaran yang Anda inginkan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'credit' ? 'border-[#0D3B66] bg-blue-50' : 'hover:bg-gray-50'}`}>
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className="flex items-center gap-3 cursor-pointer flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div>Kartu Kredit/Debit</div>
                              <div className="text-xs text-gray-500">Visa, Mastercard, JCB</div>
                            </div>
                          </Label>
                        </div>

                        <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'ewallet' ? 'border-[#0D3B66] bg-blue-50' : 'hover:bg-gray-50'}`}>
                          <RadioGroupItem value="ewallet" id="ewallet" />
                          <Label htmlFor="ewallet" className="flex items-center gap-3 cursor-pointer flex-1">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div>E-Wallet</div>
                              <div className="text-xs text-gray-500">GoPay, OVO, Dana, ShopeePay</div>
                            </div>
                          </Label>
                        </div>

                        <div className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#0D3B66] bg-blue-50' : 'hover:bg-gray-50'}`}>
                          <RadioGroupItem value="transfer" id="transfer" />
                          <Label htmlFor="transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <div>Transfer Bank</div>
                              <div className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Details */}
                {paymentMethod === 'credit' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Detail Kartu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Nomor Kartu *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              if (formatted.replace(/\s/g, '').length <= 16) {
                                setCardNumber(formatted);
                              }
                            }}
                            maxLength={19}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nama Pemegang Kartu *</Label>
                          <Input
                            id="cardName"
                            placeholder="NAMA SESUAI KARTU"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Tanggal Kadaluarsa *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                setExpiryDate(value);
                              }}
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              type="password"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === 'ewallet' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pilih E-Wallet</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedEwallet} onValueChange={setSelectedEwallet}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih e-wallet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gopay">GoPay</SelectItem>
                          <SelectItem value="ovo">OVO</SelectItem>
                          <SelectItem value="dana">DANA</SelectItem>
                          <SelectItem value="shopeepay">ShopeePay</SelectItem>
                          <SelectItem value="linkaja">LinkAja</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedEwallet && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            Anda akan diarahkan ke aplikasi {selectedEwallet.toUpperCase()} untuk menyelesaikan pembayaran.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === 'transfer' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pilih Bank</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedBank} onValueChange={setSelectedBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih bank tujuan transfer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mandiri">Mandiri</SelectItem>
                          <SelectItem value="bni">BNI</SelectItem>
                          <SelectItem value="bri">BRI</SelectItem>
                          <SelectItem value="cimb">CIMB Niaga</SelectItem>
                          <SelectItem value="permata">Permata Bank</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedBank && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                          <p className="text-sm">
                            <strong>Nomor Rekening:</strong> 1234567890
                          </p>
                          <p className="text-sm">
                            <strong>Atas Nama:</strong> PT Telcoreco Indonesia
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            Transfer sesuai nominal total. Konfirmasi otomatis setelah pembayaran diterima.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Kembali
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#F95738] hover:bg-[#e04628] py-6"
                    >
                      Bayar Sekarang
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 mb-2">
                    {items.length} Produk
                  </div>
                  {items.map((item, index) => (
                    <div key={item.id || index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.quantity}x @ Rp {item.price.toLocaleString('id-ID')}
                          </div>
                        </div>
                        <div className="text-sm text-[#0D3B66] font-medium">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {step === 2 && phoneNumber && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Nomor Aktivasi:</div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0D3B66]" />
                      <span className="font-medium text-[#0D3B66]">{phoneNumber}</span>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pajak (11%)</span>
                    <span>Rp {Math.round(tax).toLocaleString('id-ID')}</span>
                  </div>
                  {address && (
                    <div className="flex justify-between text-green-600">
                      <span>Biaya Pengiriman</span>
                      <span>GRATIS</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Pembayaran</span>
                  <div className="text-right">
                    <div className="text-2xl text-[#F95738]">
                      Rp {Math.round(total).toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Aktivasi instan setelah pembayaran</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Pembayaran aman dan terenkripsi</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Dukungan pelanggan 24/7</span>
                  </div>
                </div>

                {/* Payment Method Badge */}
                {step === 2 && paymentMethod && (
                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-600 mb-2">Metode Pembayaran:</div>
                    <Badge variant="outline" className="text-[#0D3B66]">
                      {paymentMethod === 'credit' && '💳 Kartu Kredit/Debit'}
                      {paymentMethod === 'ewallet' && '📱 E-Wallet'}
                      {paymentMethod === 'transfer' && '🏦 Transfer Bank'}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
