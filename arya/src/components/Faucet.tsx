import React, { useState } from 'react';
import { Droplets, CheckCircle2, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { requestTestnetXLM } from '../utils/stellar';
import { motion, AnimatePresence } from 'motion/react';

interface FaucetProps {
  wallet: string;
  onSuccess: () => void;
}

export const Faucet: React.FC<FaucetProps> = ({ wallet, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);
    setTxHash(null);
    try {
      const hash = await requestTestnetXLM(wallet);
      setTxHash(hash);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to request funds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleRequest}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Droplets className="w-5 h-5" />
        )}
        {loading ? 'Requesting Funds...' : 'Request Testnet XLM'}
      </button>

      <AnimatePresence>
        {txHash && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900">Success!</p>
                <p className="text-xs text-emerald-700 mb-2">Testnet XLM has been sent to your wallet.</p>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-emerald-600 hover:underline"
                >
                  TX: {txHash.slice(0, 8)}...{txHash.slice(-8)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-red-50 border border-red-100 rounded-xl overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Error</p>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
