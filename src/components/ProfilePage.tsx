import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, Mail, Phone, MapPin, Edit, Save, Radio, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userName?: string;
  userPreference?: string;
  onUpdatePreference?: (preference: string) => void;
}

export function ProfilePage({ onNavigate, userName = 'John Doe', userPreference = 'all', onUpdatePreference }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName,
    email: 'john.doe@email.com',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 123, Jakarta',
  });
  const [preference, setPreference] = useState(userPreference);

  const handleSave = () => {
    setIsEditing(false);
    if (onUpdatePreference && preference !== userPreference) {
      onUpdatePreference(preference);
      toast.success('Preferensi berhasil diperbarui!');
    }
  };

  const handleLogout = () => {
    toast.success('Berhasil logout!');
    // Navigate to home and clear session
    setTimeout(() => {
      onNavigate('home');
    }, 500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-3xl md:text-4xl mb-8 text-[#0D3B66]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profil Saya
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-[#0D3B66] text-white text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl mb-1">{profile.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{profile.email}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profil
                    </>
                  )}
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Telepon</div>
                    <div>{profile.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Alamat</div>
                    <div className="text-xs">{profile.address}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </motion.div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>
                  Kelola informasi pribadi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-[#F95738] hover:bg-[#e04628]"
                    >
                      Simpan
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            </motion.div>

            {/* Product Preference */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-[#F95738]" />
                  Preferensi Produk
                </CardTitle>
                <CardDescription>
                  Atur preferensi produk untuk rekomendasi yang lebih personal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preference">Preferensi Produk</Label>
                  <Select value={preference} onValueChange={setPreference} disabled={!isEditing}>
                    <SelectTrigger id="preference">
                      <SelectValue placeholder="Pilih preferensi produk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pulsa">Pulsa & Paket Nelpon</SelectItem>
                      <SelectItem value="data">Kuota Data Internet</SelectItem>
                      <SelectItem value="streaming">Streaming & Entertainment</SelectItem>
                      <SelectItem value="roaming">Roaming Internasional</SelectItem>
                      <SelectItem value="all">Semua Produk</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Preferensi ini akan digunakan untuk memberikan rekomendasi produk yang sesuai di dashboard Anda
                  </p>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
              <CardHeader>
                <CardTitle>Pengaturan Akun</CardTitle>
                <CardDescription>
                  Kelola preferensi dan keamanan akun
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Ubah Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notifikasi
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Metode Pembayaran
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-[#F95738] hover:text-[#e04628] hover:bg-orange-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
