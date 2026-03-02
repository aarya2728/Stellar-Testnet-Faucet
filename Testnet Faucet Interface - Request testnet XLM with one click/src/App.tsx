import { useState, useEffect, useCallback } from 'react';
import { WalletConnect } from './components/WalletConnect';
import { Balance } from './components/Balance';
import { Faucet } from './components/Faucet';
import { fetchXLMBalance } from './utils/stellar';
import { Sparkles, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const updateBalance = useCallback(async (publicKey: string) => {
    setLoadingBalance(true);
    try {
      const newBalance = await fetchXLMBalance(publicKey);
      setBalance(newBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  useEffect(() => {
    if (wallet) {
      updateBalance(wallet);
      // Set up a refresh interval
      const interval = setInterval(() => updateBalance(wallet), 30000);
      return () => clearInterval(interval);
    }
  }, [wallet, updateBalance]);

  const handleConnect = (publicKey: string) => {
    setWallet(publicKey);
  };

  const handleDisconnect = () => {
    setWallet(null);
    setBalance(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Stellar Faucet</h1>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Get Testnet XLM</h2>
            <p className="text-slate-500">Connect your Freighter wallet to request free Lumens for testing on the Stellar network.</p>
          </div>

          {/* Connection Section */}
          <WalletConnect 
            wallet={wallet} 
            onConnect={handleConnect} 
            onDisconnect={handleDisconnect} 
          />

          {wallet && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Balance 
                balance={balance} 
                loading={loadingBalance} 
                onRefresh={() => updateBalance(wallet)} 
              />
              
              <Faucet 
                wallet={wallet} 
                onSuccess={() => {
                  // Wait a bit for Horizon to catch up before refreshing balance
                  setTimeout(() => updateBalance(wallet), 2000);
                }} 
              />
            </motion.div>
          )}

          {/* Footer Info */}
          <div className="pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-100 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Network</p>
                <p className="text-sm font-semibold text-slate-700">Testnet</p>
              </div>
              <div className="p-4 bg-slate-100 rounded-xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Provider</p>
                <p className="text-sm font-semibold text-slate-700">Friendbot</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
