import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Wifi, Signal } from 'lucide-react';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

export function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // 3 detik loading

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0D3B66] via-[#1a4d7f] to-[#0D3B66] flex items-center justify-center overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F95738] rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Signal Icons */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear"
          }}
        >
          {i % 2 === 0 ? (
            <Signal className="w-6 h-6 text-white opacity-20" />
          ) : (
            <Wifi className="w-6 h-6 text-white opacity-20" />
          )}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 border-4 border-[#F95738] rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Logo Icon */}
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center shadow-2xl relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Wifi className="w-12 h-12 text-[#0D3B66]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-5xl md:text-6xl text-white mb-3">
            Telcoreco
          </h1>
          <motion.p
            className="text-xl text-[#F95738]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Connect & Recommend
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-12 w-64 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#F95738] to-orange-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.5,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Loading Text */}
          <motion.p
            className="text-white text-sm mt-4 opacity-70"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Memuat platform...
          </motion.p>
        </motion.div>

        {/* Data Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + (i * 3)}%`,
                top: '50%',
              }}
              animate={{
                y: [-20, -40, -60, -80],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Signal Waves */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-[#F95738] rounded-full"
              style={{
                width: 200 + i * 80,
                height: 200 + i * 80,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 1.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
