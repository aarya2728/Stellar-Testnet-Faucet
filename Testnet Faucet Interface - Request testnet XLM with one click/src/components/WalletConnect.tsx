import React from 'react';
import { Wallet, LogOut, Link2 } from 'lucide-react';
import freighterApi from "@stellar/freighter-api";

interface WalletConnectProps {
  wallet: string | null;
  onConnect: (publicKey: string) => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ wallet, onConnect, onDisconnect }) => {
  const handleConnect = async () => {
    try {
      const { isConnected } = await freighterApi.isConnected();
      if (!isConnected) {
        alert("Please install Freighter wallet extension.");
        return;
      }
      const { address, error } = await freighterApi.requestAccess();
      if (error) {
        console.error("Connection error:", error);
        alert(`Failed to connect wallet: ${error}`);
        return;
      }
      if (address) {
        onConnect(address);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("An unexpected error occurred while connecting the wallet.");
    }
  };

  if (wallet) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-black/5">
        <div className="p-2 bg-emerald-50 rounded-full">
          <Link2 className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Connected Wallet</p>
          <p className="text-sm font-mono text-slate-900 truncate">{wallet}</p>
        </div>
        <button
          onClick={onDisconnect}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Disconnect"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-slate-900 text-white rounded-2xl font-medium hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
    >
      <Wallet className="w-5 h-5" />
      Connect Freighter Wallet
    </button>
  );
};
