# ✨ Stellar Testnet Faucet

A premium, modern interface to connect your **Freighter Wallet** and request testnet XLM from the Stellar Friendbot. Built with performance and user experience in mind.

![Stellar Faucet Preview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## 🚀 Key Features

- 🦊 **Freighter Wallet Integration**: Seamlessly connect your wallet using the industry-standard Stellar browser extension.
- 💰 **Real-time Balance Tracking**: Automatically fetches and updates your XLM balance upon connection and after every faucet request.
- ⚡ **Instant Faucet Requests**: High-speed interaction with Stellar's Friendbot to fund your testnet account with 10,000 XLM.
- 🎨 **Premium UI/UX**: Crafted with Tailwind CSS and Framer Motion for smooth transitions and a modern "glassmorphism" aesthetic.
- 🛠️ **Stellar SDK Powered**: Robust interaction with the Stellar Horizon API.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Blockchain**: [Stellar SDK](https://github.com/stellar/js-stellar-sdk)
- **Wallet**: [Freighter API](https://www.freighter.app/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Freighter Wallet](https://www.freighter.app/) extension installed in your browser

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd arya
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory (you can copy from `.env.example`):

```env
GEMINI_API_KEY="[GCP_API_KEY]"
APP_URL="http://localhost:3000"
```

### Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## 📖 How to Use

1. **Open the App**: Navigate to the local URL.
2. **Connect Wallet**: Click the **"Connect Freighter Wallet"** button. If prompted, approve the connection in your Freighter popup.
3. **Check Balance**: Once connected, your current Testnet XLM balance will be displayed.
4. **Request Funds**: Click the **"Fund Account"** button to receive testnet XLM.
5. **Wait for Confirmation**: The app will automatically trigger a balance refresh once the transaction is processed on the network.

## 📂 Project Structure

- `src/components`: UI components (Balance, Faucet, WalletConnect).
- `src/utils/stellar.ts`: Logic for interacting with the Stellar Horizon API and Friendbot.
- `src/App.tsx`: Main application layout and state management.
- `src/index.css`: Tailwind CSS entry point.

## 📄 License

This project is open-source and available under the MIT License.
