import React from 'react';
import { Coins, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface BalanceProps {
  balance: string | null;
  loading: boolean;
  onRefresh: () => void;
}

export const Balance: React.FC<BalanceProps> = ({ balance, loading, onRefresh }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-500">
          <Coins className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">XLM Balance</span>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-baseline gap-2">
        <motion.span 
          key={balance}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-light text-slate-900"
        >
          {balance || '0.00'}
        </motion.span>
        <span className="text-lg font-medium text-slate-400">XLM</span>
      </div>
      
      {balance === '0' && !loading && (
        <p className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
          Account not yet funded on Testnet.
        </p>
      )}
    </div>
  );
};
