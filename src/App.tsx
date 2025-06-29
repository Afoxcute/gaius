import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider,
  useWallet,
  useNetwork,
} from '@txnlab/use-wallet-react'
import { WalletUIProvider, WalletButton } from '@txnlab/use-wallet-ui-react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import algosdk from 'algosdk'
import { getAlgodClient } from './utils/algod'
import { getIPFSGatewayURL } from './utils/pinata'
import { User, LogOut } from 'lucide-react'
import { supabase } from './utils/supabase'
import { checkSubscription, SubscriptionDetails } from './utils/subscription'
import { AnimatedBackground } from './components/AnimatedBackground'
import { PageTransition } from './components/PageTransition'

// Import route components
import {
  HomePage,
  DashboardPage,
  CreateProgramPage,
  SendPassPage,
  PricingPage,
  AuthPage,
  SettingsPage
} from './routes'

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    WalletId.EXODUS,
    {
      id: WalletId.WALLETCONNECT,
      options: { projectId: 'dummy-project-id' },
    },
  ],
  defaultNetwork: NetworkId.TESTNET,
})

function AppContent() {
  const { activeAddress, activeWallet } = useWallet();
  const { activeNetwork, setActiveNetwork } = useNetwork();
  const [session, setSession] = useState<any>(null);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch admin name from Supabase
  const fetchAdminName = async () => {
    if (!activeAddress) return;
    
    try {
      const { data, error } = await supabase
        .from('organization_admins')
        .select('full_name')
        .eq('wallet_address', activeAddress)
        .single();
      
      if (error) {
        console.error('Error fetching admin name:', error);
        return;
      }
      
      if (data) {
        setAdminName(data.full_name);
      }
    } catch (error) {
      console.error('Error fetching admin name:', error);
    }
  };

  // Effect to fetch admin name when address changes
  useEffect(() => {
    if (activeAddress && session) {
      fetchAdminName();
    }
  }, [activeAddress, session]);

  // Handle network switching
  const handleNetworkChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const networkId = event.target.value as NetworkId;
    try {
      // Disconnect wallet before switching networks to avoid connection issues
      if (activeWallet?.isConnected) {
        await activeWallet.disconnect();
      }
      
      await setActiveNetwork(networkId);
      
      // Show a message to the user to reconnect their wallet
      if (activeAddress) {
        alert('Network switched successfully. Please reconnect your wallet for the new network.');
      }
    } catch (error) {
      console.error('Failed to switch network:', error);
      alert('Failed to switch network. Please try again.');
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: 'global' // Sign out from all devices
      });
      
      if (error) {
        throw error;
      }
      
      // Reset state
      setAdminName(null);
      setSession(null);
      
      // Redirect to home page
      navigate('/');
      
      // Show success message
      alert('You have been signed out successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      alert(`Error signing out: ${error.message}`);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#001324] text-gray-900 dark:text-gray-100 relative">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white/80 dark:bg-gray-800/30 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/50 sticky top-0 z-50"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Gaius
                </Link>
              </motion.div>
              <nav className="hidden md:flex space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/" 
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                  >
                    Home
                  </Link>
                </motion.div>
                {!session && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/auth" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/auth' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                    >
                      Sign In / Sign Up
                    </Link>
                  </motion.div>
                )}
                {session && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/dashboard" 
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/dashboard' ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {/* Admin Name Display */}
              {session && adminName && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  <User size={16} />
                  <span className="text-sm font-medium">{adminName}</span>
                </motion.div>
              )}
              
              {/* Sign Out Button - only show when signed in */}
              {session && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                  title="Sign out"
                >
                  {isSigningOut ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full"
                    />
                  ) : (
                    <LogOut size={16} />
                  )}
                  <span className="hidden sm:inline">Sign Out</span>
                </motion.button>
              )}
              
              {/* Network Selector - only show when wallet is connected */}
              {activeAddress && (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">Network:</span>
                  <select 
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-200 hover:bg-white dark:hover:bg-gray-700"
                    value={activeNetwork}
                    onChange={handleNetworkChange}
                  >
                    <option value={NetworkId.TESTNET}>TestNet</option>
                    <option value={NetworkId.MAINNET}>MainNet</option>
                  </select>
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <WalletButton />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
      
      {/* Main content area */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } />
            <Route path="/dashboard" element={
              <PageTransition>
                <DashboardPage />
              </PageTransition>
            } />
            <Route path="/create-program" element={
              <PageTransition>
                <CreateProgramPage />
              </PageTransition>
            } />
            <Route path="/send-pass" element={
              <PageTransition>
                <SendPassPage />
              </PageTransition>
            } />
            <Route path="/pricing" element={
              <PageTransition>
                <PricingPage />
              </PageTransition>
            } />
            <Route path="/auth" element={
              <PageTransition>
                <AuthPage />
              </PageTransition>
            } />
            <Route path="/settings" element={
              <PageTransition>
                <SettingsPage />
              </PageTransition>
            } />
            <Route path="/reset-password-update" element={
              <PageTransition>
                <AuthPage />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <motion.footer 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/30 backdrop-blur-md border-t border-gray-200 dark:border-gray-700/50 py-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text cursor-pointer"
              >
                Gaius
              </motion.span>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-gray-500 dark:text-gray-400 mt-1"
              >
                All-in-One Loyalty Program
              </motion.p>
            </div>
            <div className="flex space-x-6">
              {['Terms', 'Privacy', 'Support'].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, color: '#3B82F6' }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <AppContent />
      </WalletUIProvider>
    </WalletProvider>
  );
}

export default App