import { useState, useEffect } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedCard, AnimatedButton, AnimatedList, AnimatedCounter, AnimatedProgress } from './AnimatedCard';

interface HomePageProps {
  onNavigate: (page: 'home' | 'loyalty-dashboard' | 'create-program' | 'send-pass' | 'pricing') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { activeAddress } = useWallet();
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    // Simulate loading delay for animation purposes
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, delay: 0.2 }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  const featureItems = [
    {
      title: 'Earn & Redeem',
      description: 'Collect loyalty points across multiple brands and redeem them for exclusive rewards',
      icon: '🏆'
    },
    {
      title: 'Loyalty Rewards',
      description: 'Unlock special loyalty collectibles as you reach loyalty milestones',
      icon: '🎁'
    },
    {
      title: 'Secure & Transparent',
      description: 'Blockchain-powered loyalty program with complete transparency and security',
      icon: '🔒'
    },
    {
      title: 'Cross-Brand Benefits',
      description: 'Use your points across our entire partner network for maximum flexibility',
      icon: '🔄'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        {/* Background animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500 opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-purple-500 opacity-20"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-pink-500 opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Welcome to
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Gaius Loyalty
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-100"
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              The all-in-one blockchain-powered loyalty program that rewards you across multiple brands and services
            </motion.p>
            
            <motion.div 
              className="flex flex-col lg:flex-row gap-8 justify-center items-center"
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <AnimatedButton
                  onClick={() => {
                    if (!activeAddress) {
                      alert('Please connect your wallet first to create a loyalty program');
                      return;
                    }
                    onNavigate('create-program');
                  }}
                  className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all text-gray-900 relative overflow-hidden mb-3"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🚀 Try For Free
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </AnimatedButton>
                <motion.p 
                  className="text-sm text-blue-100 opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {!activeAddress ? 'Connect wallet to get started' : 'Create your first loyalty program'}
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <AnimatedButton
                  onClick={() => {
                    if (!activeAddress) {
                      alert('Please connect your wallet first to access the organization dashboard');
                      return;
                    }
                    onNavigate('loyalty-dashboard');
                  }}
                  variant="outline"
                  className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all relative overflow-hidden mb-3"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🏢 Organization Dashboard
                  </span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </AnimatedButton>
                <motion.p 
                  className="text-sm text-blue-100 opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  {!activeAddress ? 'Connect wallet to access dashboard' : 'Manage existing programs'}
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <AnimatedButton
                  onClick={() => onNavigate('pricing')}
                  variant="outline"
                  className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all relative overflow-hidden mb-3"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    💰 View Pricing
                  </span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </AnimatedButton>
                <motion.p 
                  className="text-sm text-blue-100 opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  See our subscription plans
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="currentColor" className="text-white dark:text-[#001324] w-full h-auto">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-[#001324] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Why Choose Gaius Loyalty?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Our blockchain-powered platform offers unique benefits that traditional loyalty programs can't match
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {featureItems.map((feature, index) => (
              <AnimatedCard
                key={index}
                delay={index * 0.1}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 border border-gray-100 dark:border-gray-700"
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Loyalty Card Preview */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800/30 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div 
              className="md:w-1/2"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Your Digital Loyalty Card</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Manage all your loyalty points in one place with our digital wallet and loyalty rewards system.
              </p>
              <AnimatedList className="space-y-4">
                {['Track points across multiple brands', 'Redeem for exclusive rewards', 'Collect unique loyalty rewards', 'Secure blockchain storage'].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center text-gray-700 dark:text-gray-200"
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.svg 
                      className="w-5 h-5 mr-2 text-green-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1), type: "spring", stiffness: 200 }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </motion.svg>
                    {item}
                  </motion.li>
                ))}
              </AnimatedList>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 mt-10 md:mt-0"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Card background with gradient */}
                <motion.div 
                  className="aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 shadow-2xl p-6 relative overflow-hidden"
                  initial={{ rotateY: -30, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  {/* Card decoration elements */}
                  <motion.div 
                    className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full translate-y-1/2 -translate-x-1/4"
                    animate={{ 
                      scale: [1, 0.8, 1],
                      opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  
                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <motion.h3 
                          className="text-2xl font-bold text-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          Gaius Gold
                        </motion.h3>
                        <motion.div 
                          className="text-xl text-yellow-400"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        >
                          ★★★
                        </motion.div>
                      </div>
                      <motion.p 
                        className="text-blue-100 opacity-80 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.6 }}
                      >
                        Member since 2023
                      </motion.p>
                    </div>
                    
                    <div>
                      <div className="mb-2">
                        <motion.p 
                          className="text-xs text-blue-100 opacity-70"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.7 }}
                          transition={{ delay: 0.8 }}
                        >
                          MEMBER
                        </motion.p>
                        <motion.p 
                          className="text-lg text-white font-medium truncate"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          {activeAddress ? activeAddress.substring(0, 8) + '...' + activeAddress.substring(activeAddress.length - 4) : 'Connect Your Wallet'}
                        </motion.p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <motion.p 
                            className="text-xs text-blue-100 opacity-70"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            transition={{ delay: 1 }}
                          >
                            POINTS BALANCE
                          </motion.p>
                          <motion.p 
                            className="text-2xl font-bold text-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                          >
                            <AnimatedCounter value={1250} />
                          </motion.p>
                        </div>
                        <motion.div 
                          className="text-white opacity-80 text-4xl"
                          initial={{ opacity: 0, rotate: -180 }}
                          animate={{ opacity: 0.8, rotate: 0 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                        >
                          G
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Reflection/shine effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-20"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0) 130%)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white dark:bg-[#001324] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              Choose the plan that fits your organization's needs
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Basic Plan */}
            <AnimatedCard
              delay={0}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Basic</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">5</span>
                <span className="text-gray-600 dark:text-gray-400"> ALGO</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Up to 250 members', '5 loyalty programs', 'Basic analytics'].map((feature, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedCard>

            {/* Pro Plan */}
            <AnimatedCard
              delay={0.1}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-blue-500 dark:border-blue-500 relative transform scale-105"
            >
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-1 text-sm font-medium"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Recommended
              </motion.div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white mt-4">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">20</span>
                <span className="text-gray-600 dark:text-gray-400"> ALGO</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Up to 2,500 members', '20 loyalty programs', 'Advanced analytics', 'Priority support'].map((feature, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedCard>

            {/* Enterprise Plan */}
            <AnimatedCard
              delay={0.2}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">50</span>
                <span className="text-gray-600 dark:text-gray-400"> ALGO</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Unlimited members', 'Unlimited programs', 'Premium analytics', 'Dedicated support'].map((feature, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedCard>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <AnimatedButton 
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              View All Plans
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, #3B82F6, #8B5CF6)",
              "linear-gradient(45deg, #8B5CF6, #3B82F6)",
              "linear-gradient(45deg, #3B82F6, #8B5CF6)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Join Gaius Loyalty?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect your wallet now to start earning rewards and collecting unique loyalty rewards
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton 
              onClick={() => {
                if (!activeAddress) {
                  alert('Please connect your wallet first to create a loyalty program');
                  return;
                }
                onNavigate('create-program');
              }}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {!activeAddress ? 'Connect Wallet & Start Earning' : 'Create Loyalty Program'}
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}