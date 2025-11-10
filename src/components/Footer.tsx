import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import telcorecoLogo from 'figma:asset/94b9eb913c63316a08244d80187b377cb4bef1e0.png';

export function Footer() {
  return (
    <footer className="bg-[#0D3B66] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={telcorecoLogo} alt="Telcoreco Logo" className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight">
                  Telcoreco
                </span>
                <span className="text-[9px] tracking-widest text-[#F95738] uppercase -mt-1">
                  Connect & Recommend
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Platform rekomendasi produk telekomunikasi terpercaya untuk memenuhi kebutuhan digital Anda.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Hubungi Kami</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@telcoreco.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#1a4d7f] rounded-full flex items-center justify-center hover:bg-[#F95738] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1a4d7f] rounded-full flex items-center justify-center hover:bg-[#F95738] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1a4d7f] rounded-full flex items-center justify-center hover:bg-[#F95738] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Telcoreco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
