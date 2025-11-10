export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  image?: string;
  details?: {
    speed?: string;
    validity: string;
    quota?: string;
  };
}

export const productsData: Product[] = [
  {
    id: 'p1',
    name: 'Paket Hemat 10GB',
    category: 'data',
    price: 50000,
    description: 'Paket internet hemat dengan kuota besar dan bonus streaming untuk kebutuhan sehari-hari',
    features: [
      '10GB kuota internet utama',
      '2GB bonus untuk aplikasi streaming',
      'Unlimited akses ke aplikasi chat',
      'Kecepatan hingga 4G LTE',
      'Berlaku 30 hari',
      'Bisa diperpanjang otomatis',
    ],
    popular: true,
    image: 'https://images.unsplash.com/photo-1760531963397-53ea8619a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkYXRhJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      speed: '4G LTE hingga 42 Mbps',
      validity: '30 hari',
      quota: '12GB total (10GB utama + 2GB bonus)',
    },
  },
  {
    id: 'p2',
    name: 'Paket Super 25GB',
    category: 'data',
    price: 100000,
    description: 'Paket internet super dengan kuota besar dan unlimited social media untuk kebutuhan maksimal',
    features: [
      '25GB kuota internet utama',
      'Unlimited akses social media',
      '5GB bonus streaming Netflix & Youtube',
      'Kecepatan hingga 4G LTE+',
      'Berlaku 30 hari',
      'Prioritas jaringan',
    ],
    image: 'https://images.unsplash.com/photo-1760531963397-53ea8619a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkYXRhJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      speed: '4G LTE+ hingga 100 Mbps',
      validity: '30 hari',
      quota: '30GB total (25GB utama + 5GB bonus)',
    },
  },
  {
    id: 'p3',
    name: 'Paket Unlimited 50GB',
    category: 'data',
    price: 150000,
    description: 'Paket unlimited dengan kuota cepat besar dan internet tanpa batas untuk pengguna heavy',
    features: [
      '50GB kuota internet berkecepatan penuh',
      'Unlimited internet 24 jam setelah kuota utama',
      '10GB bonus streaming premium',
      'Kecepatan 4G LTE+ dengan prioritas tertinggi',
      'Berlaku 30 hari',
      'Gaming & streaming lancar',
    ],
    popular: true,
    image: 'https://images.unsplash.com/photo-1760531963397-53ea8619a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBkYXRhJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      speed: '4G LTE+ hingga 150 Mbps',
      validity: '30 hari',
      quota: '60GB total + Unlimited',
    },
  },
  {
    id: 'p4',
    name: 'Pulsa Reguler 50K',
    category: 'pulsa',
    price: 50000,
    description: 'Pulsa reguler untuk nelpon, SMS, dan paket internet',
    features: [
      'Rp 50.000 pulsa reguler',
      'Bisa untuk nelpon, SMS, dan beli paket',
      'Berlaku 30 hari',
      'Bisa untuk semua operator',
      'Transfer pulsa tersedia',
    ],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGNhbGx8ZW58MXx8fHwxNzYyMTUyMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '30 hari',
    },
  },
  {
    id: 'p5',
    name: 'Paket Nelpon 100 Menit',
    category: 'pulsa',
    price: 30000,
    description: '100 menit untuk nelpon ke semua operator dalam dan luar negeri',
    features: [
      '100 menit nelpon ke semua operator',
      '50 SMS ke semua operator',
      'Berlaku 7 hari',
      'Bisa untuk nelpon internasional',
    ],
    popular: true,
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGNhbGx8ZW58MXx8fHwxNzYyMTUyMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '7 hari',
    },
  },
  {
    id: 'p6',
    name: 'Netflix Premium',
    category: 'streaming',
    price: 186000,
    description: 'Akses Netflix Premium dengan kualitas 4K Ultra HD untuk 1 bulan',
    features: [
      'Kualitas streaming 4K Ultra HD',
      'Bisa digunakan 4 layar sekaligus',
      'Download konten untuk offline',
      'Berlaku 30 hari',
      'Akses penuh semua konten Netflix',
    ],
    popular: true,
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwc3RyZWFtaW5nfGVufDF8fHx8MTc2MjE1MjE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '30 hari',
    },
  },
  {
    id: 'p7',
    name: 'Spotify Premium',
    category: 'streaming',
    price: 54990,
    description: 'Nikmati musik tanpa iklan dengan kualitas audio terbaik',
    features: [
      'Musik tanpa iklan',
      'Download hingga 10.000 lagu',
      'Kualitas audio High Quality',
      'Skip lagu unlimited',
      'Berlaku 30 hari',
    ],
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG90aWZ5JTIwbXVzaWN8ZW58MXx8fHwxNzYyMTUyMTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '30 hari',
    },
  },
  {
    id: 'p8',
    name: 'Roaming Asia 5GB',
    category: 'roaming',
    price: 200000,
    description: 'Paket roaming untuk negara-negara Asia dengan kuota besar',
    features: [
      '5GB kuota internet roaming',
      'Berlaku di 20 negara Asia',
      '30 menit nelpon internasional',
      'Berlaku 7 hari',
      'Aktivasi otomatis saat tiba',
    ],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB3b3JsZHxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '7 hari',
      quota: '5GB roaming',
    },
  },
  {
    id: 'p9',
    name: 'Roaming Global 10GB',
    category: 'roaming',
    price: 400000,
    description: 'Paket roaming global untuk traveling ke berbagai negara di dunia',
    features: [
      '10GB kuota internet roaming',
      'Berlaku di 50+ negara',
      '60 menit nelpon internasional',
      'Berlaku 14 hari',
      'Coverage Eropa, Asia, Amerika',
    ],
    popular: true,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjB3b3JsZHxlbnwxfHx8fDE3NjIxNTIxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: {
      validity: '14 hari',
      quota: '10GB roaming',
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return productsData.find(p => p.id === id);
}
