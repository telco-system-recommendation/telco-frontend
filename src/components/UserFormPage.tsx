import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { User, Phone, Radio } from 'lucide-react';

interface UserFormPageProps {
  onComplete: (userData: { name: string; phone: string; preference: string }) => void;
}

export function UserFormPage({ onComplete }: UserFormPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preference, setPreference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ name, phone, preference });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0D3B66] via-[#164a7e] to-[#1a4d7f] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#F95738]/20 via-[#F95738]/10 to-transparent rounded-full blur-3xl" style={{ animation: 'pulse 4s ease-in-out infinite' }}></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-[#F95738]/10 to-white/5 rounded-full blur-2xl" style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
        
        {/* Floating Circles with Animation */}
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-xl" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
        <div className="absolute bottom-32 right-1/4 w-48 h-48 bg-[#F95738]/8 rounded-full blur-2xl" style={{ animation: 'float 8s ease-in-out infinite reverse' }}></div>
        <div className="absolute top-1/2 left-16 w-24 h-24 bg-white/10 rounded-full blur-lg" style={{ animation: 'float 5s ease-in-out infinite' }}></div>
        
        {/* Floating Particles - Data Bits */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Data Stream Lines - Vertical */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" style={{ animation: 'slideDown 3s linear infinite' }}></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#F95738]/20 to-transparent" style={{ animation: 'slideDown 4s linear infinite', animationDelay: '1s' }}></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent" style={{ animation: 'slideDown 5s linear infinite', animationDelay: '2s' }}></div>
        
        {/* Moving Data Packets */}
        <div className="absolute top-1/4 left-0 w-full">
          <div className="relative h-1">
            <div className="absolute w-16 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" style={{ animation: 'slideRight 8s linear infinite' }}></div>
          </div>
        </div>
        <div className="absolute top-2/3 left-0 w-full">
          <div className="relative h-1">
            <div className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-[#F95738]/40 to-transparent rounded-full" style={{ animation: 'slideRight 10s linear infinite', animationDelay: '3s' }}></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-0 w-full">
          <div className="relative h-1">
            <div className="absolute w-12 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" style={{ animation: 'slideRight 6s linear infinite', animationDelay: '1.5s' }}></div>
          </div>
        </div>
        
        {/* Signal Waves - Multiple Sets */}
        <div className="absolute top-1/4 left-12 opacity-20">
          <div className="flex items-end gap-2">
            <div className="w-2 h-10 bg-white rounded-full" style={{ animation: 'wave 1.5s ease-in-out infinite' }}></div>
            <div className="w-2 h-16 bg-white rounded-full" style={{ animation: 'wave 1.5s ease-in-out 0.1s infinite' }}></div>
            <div className="w-2 h-24 bg-white rounded-full" style={{ animation: 'wave 1.5s ease-in-out 0.2s infinite' }}></div>
            <div className="w-2 h-20 bg-white rounded-full" style={{ animation: 'wave 1.5s ease-in-out 0.3s infinite' }}></div>
            <div className="w-2 h-14 bg-white rounded-full" style={{ animation: 'wave 1.5s ease-in-out 0.4s infinite' }}></div>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 right-16 opacity-15">
          <div className="flex items-end gap-2">
            <div className="w-2 h-12 bg-[#F95738] rounded-full" style={{ animation: 'wave 2s ease-in-out infinite' }}></div>
            <div className="w-2 h-18 bg-[#F95738] rounded-full" style={{ animation: 'wave 2s ease-in-out 0.15s infinite' }}></div>
            <div className="w-2 h-24 bg-[#F95738] rounded-full" style={{ animation: 'wave 2s ease-in-out 0.3s infinite' }}></div>
            <div className="w-2 h-16 bg-[#F95738] rounded-full" style={{ animation: 'wave 2s ease-in-out 0.45s infinite' }}></div>
          </div>
        </div>
        
        {/* WiFi Signal Rings */}
        <div className="absolute top-16 right-1/3 opacity-10">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-2 border-white rounded-full" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            <div className="absolute inset-4 border-2 border-white rounded-full" style={{ animation: 'ping 2s 0.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            <div className="absolute inset-8 border-2 border-white rounded-full" style={{ animation: 'ping 2s 1s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
          </div>
        </div>
        
        {/* Connection Nodes Network */}
        <div className="absolute top-1/3 right-20 opacity-10">
          <div className="relative w-40 h-40">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#F95738] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 bg-[#F95738] rounded-full"></div>
            <svg className="absolute inset-0 w-full h-full" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
              <line x1="50%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="50%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#F95738" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            </svg>
          </div>
        </div>
        
        {/* Geometric Shapes with Rotation */}
        <div className="absolute top-24 right-1/4 w-20 h-20 border-2 border-white/15 rotate-45" style={{ animation: 'spin 20s linear infinite' }}></div>
        <div className="absolute top-32 right-1/3 w-14 h-14 border-2 border-[#F95738]/20" style={{ animation: 'spin 15s linear infinite reverse' }}></div>
        <div className="absolute bottom-48 left-1/4 w-16 h-16 border-2 border-white/10 rotate-12" style={{ animation: 'spin 25s linear infinite' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-[#F95738]/10 rotate-45"></div>
        
        {/* Hexagon Tech Pattern */}
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <svg width="100" height="100" style={{ animation: 'float 7s ease-in-out infinite' }}>
            <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
            <polygon points="50,15 80,33 80,67 50,85 20,67 20,33" fill="none" stroke="#F95738" strokeWidth="1" opacity="0.5" />
            <circle cx="50" cy="50" r="8" fill="white" opacity="0.5">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        {/* Binary Code Stream */}
        <div className="absolute top-20 right-12 opacity-10 space-y-1" style={{ animation: 'slideDown 15s linear infinite' }}>
          {['1011', '0101', '1100', '0011', '1010', '0110'].map((code, i) => (
            <div key={`binary-${i}`} className="text-xs text-white tracking-wider" style={{ animationDelay: `${i * 0.5}s` }}>
              {code}
            </div>
          ))}
        </div>
        
        {/* Loading Bar Animations */}
        <div className="absolute bottom-20 left-12 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-white/40 to-[#F95738]/40 rounded-full" style={{ animation: 'loadingBar 2s ease-in-out infinite' }}></div>
        </div>
        
        {/* Radar Sweep Effect */}
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
            <div className="absolute inset-4 border border-white/20 rounded-full"></div>
            <div className="absolute inset-8 border border-white/10 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-[#F95738] to-transparent origin-left"
              style={{ 
                animation: 'radarSweep 4s linear infinite',
                transformOrigin: '0% 50%'
              }}
            ></div>
          </div>
        </div>
        
        {/* Constellation Connections */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 opacity-10">
          <svg className="w-full h-full" style={{ animation: 'pulse 5s ease-in-out infinite' }}>
            <circle cx="20" cy="20" r="3" fill="white" />
            <circle cx="80" cy="30" r="3" fill="#F95738" />
            <circle cx="120" cy="80" r="3" fill="white" />
            <circle cx="40" cy="100" r="3" fill="#F95738" />
            <circle cx="140" cy="120" r="3" fill="white" />
            <line x1="20" y1="20" x2="80" y2="30" stroke="white" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="80" y1="30" x2="120" y2="80" stroke="#F95738" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="120" y1="80" x2="40" y2="100" stroke="white" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="6" dur="0.8s" repeatCount="indefinite" />
            </line>
            <line x1="40" y1="100" x2="140" y2="120" stroke="#F95738" strokeWidth="1" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" from="0" to="6" dur="1.5s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
        
        {/* Dotted Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px)',
        }}></div>
      </div>
      
      {/* Inline Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatParticle {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          25% { opacity: 0.8; }
          50% { transform: translate(20px, -50px) scale(1.2); opacity: 1; }
          75% { opacity: 0.8; }
          100% { transform: translate(0, -100px) scale(0.8); opacity: 0; }
        }
        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <Card className="w-full max-w-2xl shadow-2xl relative z-10 border-white/10 backdrop-blur-sm bg-white/95 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(13,59,102,0.3)]" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#F95738] rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              {/* Orbiting Dots */}
              <div className="absolute inset-0" style={{ animation: 'spin 8s linear infinite' }}>
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-[#F95738] rounded-full"></div>
              </div>
              <div className="absolute inset-0" style={{ animation: 'spin 8s linear infinite reverse', animationDelay: '1s' }}>
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-white rounded-full"></div>
              </div>
              {/* Icon Container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#F95738] to-[#e04628] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 hover:rotate-6">
                <Radio className="w-10 h-10 text-white" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                {/* Signal Indicator */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-[#0D3B66] to-[#1a4d7f] bg-clip-text text-transparent" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}>
            Lengkapi Profil Anda
          </CardTitle>
          <CardDescription className="text-base" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s backwards' }}>
            Bantu kami memberikan rekomendasi produk terbaik untuk Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group" style={{ animation: 'fadeInUp 0.6s ease-out 0.4s backwards' }}>
              <Label htmlFor="name" className="transition-colors group-focus-within:text-[#0D3B66]">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-[#F95738]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-[#F95738]/20 focus:border-[#F95738] hover:border-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group" style={{ animation: 'fadeInUp 0.6s ease-out 0.5s backwards' }}>
              <Label htmlFor="phone" className="transition-colors group-focus-within:text-[#0D3B66]">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-[#F95738]" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08xx xxxx xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-[#F95738]/20 focus:border-[#F95738] hover:border-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2" style={{ animation: 'fadeInUp 0.6s ease-out 0.6s backwards' }}>
              <Label htmlFor="preference">Preferensi Produk</Label>
              <Select value={preference} onValueChange={setPreference} required>
                <SelectTrigger id="preference" className="transition-all duration-300 focus:ring-2 focus:ring-[#F95738]/20 focus:border-[#F95738] hover:border-gray-400">
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
            </div>

            <div style={{ animation: 'fadeInUp 0.6s ease-out 0.7s backwards' }}>
              <Button 
                type="submit" 
                className="w-full bg-[#F95738] hover:bg-[#e04628] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <span className="relative z-10">Lanjut</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
