import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Sparkles, TrendingUp, Clock, CheckCircle2, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export interface Transaction {
  id: string;
  product: string;
  date: string;
  price: number;
  status: 'completed' | 'pending' | 'failed';
}

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userPreference: string;
  userName: string;
  onBuyProduct: (productName: string, productPrice: number) => void;
  transactions: Transaction[];
}

export function DashboardPage({ onNavigate, onLogout, userPreference, userName, onBuyProduct, transactions }: DashboardPageProps) {
  // Product recommendations based on user preference
  const allRecommendations = {
    pulsa: [
      {
        id: 'r1',
        name: 'Pulsa Reguler 50K',
        price: 50000,
        match: 98,
        reason: 'Paket pulsa paling populer untuk kebutuhan sehari-hari',
      },
      {
        id: 'r2',
        name: 'Paket Telpon Unlimited',
        price: 45000,
        match: 92,
        reason: 'Nelpon sepuasnya ke semua operator',
      },
      {
        id: 'r3',
        name: 'Pulsa Jumbo 100K',
        price: 100000,
        match: 85,
        reason: 'Hemat untuk kebutuhan pulsa bulanan',
      },
    ],
    data: [
      {
        id: 'r1',
        name: 'Paket Hemat 10GB',
        price: 50000,
        match: 97,
        reason: 'Kuota internet hemat untuk browsing dan sosmed',
      },
      {
        id: 'r2',
        name: 'Paket Super 25GB',
        price: 100000,
        match: 93,
        reason: 'Kuota besar untuk streaming dan download',
      },
      {
        id: 'r3',
        name: 'Unlimited Nonstop',
        price: 150000,
        match: 88,
        reason: 'Akses internet tanpa batas untuk kebutuhan maksimal',
      },
    ],
    streaming: [
      {
        id: 'r1',
        name: 'Netflix Premium',
        price: 186000,
        match: 96,
        reason: 'Streaming film & series berkualitas 4K',
      },
      {
        id: 'r2',
        name: 'Spotify Premium',
        price: 54990,
        match: 94,
        reason: 'Musik tanpa iklan dengan kualitas terbaik',
      },
      {
        id: 'r3',
        name: 'Disney+ Hotstar',
        price: 39000,
        match: 89,
        reason: 'Konten entertainment dari Disney dan lokal',
      },
    ],
    roaming: [
      {
        id: 'r1',
        name: 'Roaming Asia 7 Hari',
        price: 150000,
        match: 95,
        reason: 'Paket data roaming untuk negara Asia',
      },
      {
        id: 'r2',
        name: 'Roaming Global 14 Hari',
        price: 350000,
        match: 91,
        reason: 'Akses internet di seluruh dunia',
      },
      {
        id: 'r3',
        name: 'Roaming Eropa 10 Hari',
        price: 250000,
        match: 87,
        reason: 'Paket khusus untuk traveling ke Eropa',
      },
    ],
    all: [
      {
        id: 'r1',
        name: 'Paket Hemat 10GB',
        price: 50000,
        match: 95,
        reason: 'Pilihan terpopuler untuk semua kebutuhan',
      },
      {
        id: 'r2',
        name: 'Netflix Premium',
        price: 186000,
        match: 88,
        reason: 'Hiburan streaming kualitas terbaik',
      },
      {
        id: 'r3',
        name: 'Pulsa Reguler 50K',
        price: 50000,
        match: 82,
        reason: 'Paket pulsa standar yang paling sering dibeli',
      },
    ],
  };

  const recommendations = allRecommendations[userPreference as keyof typeof allRecommendations] || allRecommendations.all;

  // Calculate statistics from transactions
  const totalTransactions = transactions.length;
  const totalSpending = transactions.reduce((sum, tx) => sum + tx.price, 0);
  const activePackages = Math.min(transactions.length, 2); // Mock active packages

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl mb-2 text-[#0D3B66]">Dashboard</h1>
            <p className="text-gray-600">
              {userName ? `Selamat datang kembali, ${userName}! 👋` : 'Selamat datang kembali! 👋'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Transaksi</p>
                    <p className="text-2xl">{totalTransactions}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Pengeluaran</p>
                    <p className="text-2xl">
                      {totalSpending === 0 ? 'Rp 0' : `Rp ${(totalSpending / 1000).toFixed(0)}K`}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Paket Aktif</p>
                    <p className="text-2xl">{activePackages}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#F95738]" />
                  <CardTitle>Untuk Kamu</CardTitle>
                </div>
                <CardDescription>
                  {userPreference === 'pulsa' && 'Rekomendasi Pulsa & Paket Nelpon berdasarkan preferensi Anda'}
                  {userPreference === 'data' && 'Rekomendasi Kuota Data Internet berdasarkan preferensi Anda'}
                  {userPreference === 'streaming' && 'Rekomendasi Streaming & Entertainment berdasarkan preferensi Anda'}
                  {userPreference === 'roaming' && 'Rekomendasi Roaming Internasional berdasarkan preferensi Anda'}
                  {userPreference === 'all' && 'Rekomendasi produk berdasarkan preferensi dan kebiasaan Anda'}
                </CardDescription>
                {userPreference !== 'all' && (
                  <div className="mt-3">
                    <Badge className="bg-[#F95738] hover:bg-[#F95738]">
                      {userPreference === 'pulsa' && 'Preferensi: Pulsa & Paket Nelpon'}
                      {userPreference === 'data' && 'Preferensi: Kuota Data Internet'}
                      {userPreference === 'streaming' && 'Preferensi: Streaming & Entertainment'}
                      {userPreference === 'roaming' && 'Preferensi: Roaming Internasional'}
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="mb-1">{rec.name}</h3>
                          <p className="text-sm text-gray-600">{rec.reason}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {rec.match}% Match
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-[#F95738]">
                          Rp {rec.price.toLocaleString('id-ID')}
                        </span>
                        <Button
                          size="sm"
                          className="bg-[#0D3B66] hover:bg-[#1a4d7f]"
                          onClick={() => onBuyProduct(rec.name, rec.price)}
                        >
                          Beli Sekarang
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>Transaksi pembelian produk terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="mb-2">Belum ada transaksi</p>
                    <p className="text-sm">Mulai berbelanja untuk melihat riwayat transaksi Anda</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produk</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.product}</TableCell>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>Rp {transaction.price.toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <Badge className={
                              transaction.status === 'completed' 
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : transaction.status === 'pending'
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                            }>
                              {transaction.status === 'completed' ? 'Berhasil' : 
                               transaction.status === 'pending' ? 'Pending' : 'Gagal'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Akses fitur populer dengan cepat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start bg-[#F95738] hover:bg-[#e04628]"
                  onClick={() => onNavigate('categories')}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Lihat Semua Produk
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('profile')}
                >
                  Lihat Profil
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('promo')}
                >
                  Promo Terbaru
                </Button>
              </CardContent>
            </Card>
            </motion.div>

            {/* Active Package */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card className="bg-gradient-to-br from-[#0D3B66] to-[#1a4d7f] text-white">
              <CardHeader>
                <CardTitle className="text-white">Paket Aktif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1">Paket Hemat 10GB</h3>
                    <p className="text-sm opacity-90">Sisa kuota: 7.2 GB</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-[#F95738] h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs opacity-75">Berlaku hingga 30 November 2025</p>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
