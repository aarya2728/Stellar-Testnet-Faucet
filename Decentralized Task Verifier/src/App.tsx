import { useState, useEffect } from 'react'
import { ethers, Contract, BrowserProvider } from 'ethers'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FileText, CheckCircle, Clock } from 'lucide-react'
import abiData from '../artifacts/contracts/TaskVerifier.sol/TaskVerifier.json'

// Assume contract is deployed here
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const CONTRACT_ABI = abiData ? abiData.abi : []

export default function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  const [account, setAccount] = useState<string>('')
  const [reportData, setReportData] = useState<string>('')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (window.ethereum) {
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      setProvider(browserProvider)
      
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) setAccount(accounts[0])
        else setAccount('')
      })
    }
  }, [])

  const connectWallet = async () => {
    if (!provider) return toast.error('Please install MetaMask!')
    try {
      const accounts = await provider.send('eth_requestAccounts', [])
      setAccount(accounts[0])
    } catch (error) {
      toast.error('Failed to connect wallet')
    }
  }

  const getContract = async (signer = false) => {
    if (!provider) throw new Error('No provider')
    if (signer) {
      const s = await provider.getSigner()
      return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, s)
    }
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
  }

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      if (!provider) return []
      const contract = await getContract()
      const data = await contract.getReports()
      return data.map((r: any) => ({
        id: Number(r.id),
        data: r.data,
        submitter: r.submitter,
        verified: r.verified
      }))
    },
    enabled: !!provider
  })

  const submitReportMutation = useMutation({
    mutationFn: async (data: string) => {
      const contract = await getContract(true)
      const tx = await contract.createReport(data)
      const loadingToast = toast.loading('Transaction pending...')
      await tx.wait()
      toast.dismiss(loadingToast)
      return tx
    },
    onSuccess: () => {
      toast.success('Report submitted successfully!')
      setReportData('')
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error: any) => {
      toast.error(error.reason || 'Transaction failed')
    }
  })

  const verifyReportMutation = useMutation({
    mutationFn: async (id: number) => {
      const contract = await getContract(true)
      const tx = await contract.verifyReport(id)
      const loadingToast = toast.loading('Transaction pending...')
      await tx.wait()
      toast.dismiss(loadingToast)
      return tx
    },
    onSuccess: () => {
      toast.success('Report verified successfully!')
      queryClient.invalidateQueries({ queryKey: ['reports'] })
    },
    onError: (error: any) => {
      toast.error(error.reason || 'Transaction failed. Are you the owner?')
    }
  })

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center rounded-xl bg-slate-800 p-6 shadow-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Decentralized Task Verifier
            </h1>
          </div>
          
          <button 
            onClick={connectWallet}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/25"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Submit New Report</h2>
              <textarea
                value={reportData}
                onChange={(e) => setReportData(e.target.value)}
                className="w-full h-32 bg-slate-900 text-slate-100 rounded-lg p-3 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-500"
                placeholder="Describe your task or incident report..."
              />
              <button
                disabled={submitReportMutation.isPending || !reportData || !account}
                onClick={() => submitReportMutation.mutate(reportData)}
                className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-2.5 rounded-lg transition-all shadow-lg"
              >
                {submitReportMutation.isPending ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
              {isLoading && <span className="text-sm text-slate-400 animate-pulse">Fetching from chain...</span>}
            </div>

            {reports.length === 0 && !isLoading && (
              <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-slate-400">No reports found on the network.</p>
              </div>
            )}

            {reports.slice().reverse().map((report: any) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 relative rounded-xl p-6 border border-slate-700 hover:border-slate-600 shadow-lg group transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                      ID #{report.id}
                    </span>
                    <span className="text-xs font-mono text-blue-400 truncate max-w-[120px]">
                      {report.submitter}
                    </span>
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium px-3 py-1 rounded-full ${report.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {report.verified ? <CheckCircle className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
                    {report.verified ? 'Verified' : 'Pending'}
                  </div>
                </div>
                
                <p className="text-slate-200 mt-3 mb-6 text-lg leading-relaxed">{report.data}</p>
                
                {!report.verified && (
                  <button
                    disabled={verifyReportMutation.isPending}
                    onClick={() => verifyReportMutation.mutate(report.id)}
                    className="absolute bottom-6 right-6 text-sm bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Verify (Owner Only)
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
