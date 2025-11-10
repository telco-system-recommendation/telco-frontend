import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, Mail, Lock, Wifi, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SignUpPageProps {
  onSignUp: (email: string) => void;
  onNavigate: (page: string) => void;
}

export function SignUpPage({ onSignUp, onNavigate }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(email);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-gradient-to-br from-[#F95738] via-[#e04628] to-[#F95738]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Glowing Circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0D3B66]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Sign Up Card */}
      <motion.div
        className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="w-full relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6 pt-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F95738] to-[#e04628] rounded-xl flex items-center justify-center shadow-lg">
                      <Wifi className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#0D3B66] rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <h1 className="text-xl text-[#0D3B66]">Telcoreco</h1>
                    <p className="text-[#F95738] text-xs">Connect & Recommend</p>
                  </div>
                </div>
              </div>

              <CardTitle className="text-2xl md:text-3xl text-[#0D3B66]">Buat Akun Baru</CardTitle>
              <CardDescription className="text-base">
                Daftar untuk memulai perjalanan digital Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 sm:px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base text-gray-700">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-12 h-12 text-base border-gray-300 focus:border-[#F95738] focus:ring-[#F95738]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-12 text-base border-gray-300 focus:border-[#F95738] focus:ring-[#F95738]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base text-gray-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-12 text-base border-gray-300 focus:border-[#F95738] focus:ring-[#F95738]"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="w-5 h-5 text-[#F95738] flex-shrink-0 mt-0.5" />
                  <p>
                    Dengan mendaftar, Anda menyetujui{' '}
                    <button type="button" className="text-[#F95738] hover:underline">
                      Syarat & Ketentuan
                    </button>{' '}
                    kami
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#F95738] to-[#e04628] hover:from-[#e04628] hover:to-[#F95738] h-12 text-base shadow-lg group"
                  >
                    Buat Akun
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </form>
              
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-base text-gray-600">
                  Sudah punya akun?{' '}
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-[#0D3B66] hover:text-[#1a4d7f] font-medium hover:underline inline-flex items-center gap-1 group"
                  >
                    Masuk sekarang
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Benefits */}
        <motion.div
          className="hidden lg:block text-white space-y-8 px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-white to-gray-200 rounded-2xl flex items-center justify-center shadow-2xl">
                <Wifi className="w-8 h-8 text-[#F95738]" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#0D3B66] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            <div>
              <h1 className="text-3xl">Telcoreco</h1>
              <p className="text-white/90 text-sm">Connect & Recommend</p>
            </div>
          </div>

          {/* Headline */}
          <div className="mt-8">
            <h2 className="text-3xl mb-4">Bergabunglah dengan Ribuan Pengguna</h2>
            <p className="text-white/80 text-lg">
              Nikmati berbagai keuntungan eksklusif dengan menjadi member Telcoreco
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-5 mt-12">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Proses Cepat & Mudah</h3>
                <p className="text-white/70 text-sm">Registrasi hanya membutuhkan waktu kurang dari 1 menit</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Akses ke Semua Produk</h3>
                <p className="text-white/70 text-sm">Dapatkan akses ke ribuan produk digital terbaik</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Rekomendasi Khusus</h3>
                <p className="text-white/70 text-sm">Sistem AI kami memberikan rekomendasi sesuai preferensi Anda</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg mb-1">Promo & Diskon Eksklusif</h3>
                <p className="text-white/70 text-sm">Nikmati berbagai penawaran spesial hanya untuk member</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
