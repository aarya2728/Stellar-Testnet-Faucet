# 🌌 Stellar Swap DEX

A premium decentralized token swap interface powered by the Stellar Network's native DEX and the new lightning-fast **Soroban Smart Contracts**. 
This project features a robust React frontend with modern aesthetics and an ultra-optimized rust-based WebAssembly (WASM) smart contract for instantaneous quotes and deterministic swaps.

## 📸 Interface Preview

### 1. Secure Portal

![Secure Portal Login]    <img width="941" height="784" alt="Screenshot 2026-03-02 132806" src="https://github.com/user-attachments/assets/d6e76268-db5b-4c5e-aacf-31527f6f514d" />


### 2. Decentralized Swap Engine

![Unconnected Swap Interface]    <img width="1723" height="792" alt="Screenshot 2026-03-02 132846" src="https://github.com/user-attachments/assets/eaf793d6-6180-4e1d-8765-77a0e24bfcb6" />


### 3. Wallet Connected

![Connected Swap Interface]       <img width="1712" height="777" alt="Screenshot 2026-03-02 132911" src="https://github.com/user-attachments/assets/fafa0738-dcb6-493c-9cf0-d9969b5088f4" />


### 4.  Real-time progress

![Swap Quote In Progress]    <img width="1680" height="786" alt="Screenshot 2026-03-02 133013" src="https://github.com/user-attachments/assets/c413fa5c-b113-47e0-bc17-c648d0be5818" />



### 5. Seamless On-Chain Confirmation

![Transaction Broadcasting & Wallet Confirmation]          <img width="1669" height="738" alt="Screenshot 2026-03-02 133132" src="https://github.com/user-attachments/assets/2a74f5b1-f52f-4ff9-8dc2-b9cac49e8a24" />


## ✨ Features

- **Freighter Wallet Integration**: Secure connection via the industry-standard Stellar wallet.
- **Soroban Smart Contracts**: Real-time smart contract execution deployed on the Stellar Testnet.
- **Instant Quotes**: Bypasses slow Horizon path-finding API in favor of determinative on-chain AMM math.
- **Slippage Protection**: Adjustable tolerance to protect users from high volatility.
- **Minimalist & Premium UI**: Built with Framer Motion, Tailwind CSS, and Lucide Icons for a smooth experience.
- **Testnet Automatic Funding**: Instantly fund a new wallet via Friendbot with a single click.

## 🏗 Architecture

The application is split into a modern decoupled architecture:

### 1. Frontend (React + Vite)

- **Framework**: `React 18` with `Vite` for near-instant development.
- **Styling**: `Tailwind CSS 4.0` for utility-first responsive design.
- **Animations**: `Framer Motion` for smooth micro-interactions.
- **Icons**: `Lucide React` for a consistent iconography system.
- **Blockchain**: `stellar-sdk` and `@stellar/freighter-api`.

### 2. Smart Contracts (Soroban / Rust)

- **Framework**: `soroban-sdk` for building extremely lightweight on-chain logic.
- **Target**: Compiles perfectly to `wasm32-unknown-unknown` for WASM execution on the Stellar Network.
- **Operations**:
  - `get_quote`: Provides instantaneous exchange rates without making expensive external API queries.
  - `swap`: Handles token exchanges deterministically and directly on-chain for a fast, robust user experience.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or later)
- [Rust](https://www.rust-lang.org/tools/install) (latest stable version)
- [Freighter Wallet](https://www.freighter.app/) extension installed in your browser

### Installation & Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Decentralized Token Swap Interface"
   ```

2. **Build the Smart Contract (Optional)**
   _The project uses simulated Soroban calls out-of-the-box for ease of use, but you can build the native WASM contract locally._

   ```bash
   rustup target add wasm32-unknown-unknown
   cd contracts/swap
   cargo build --target wasm32-unknown-unknown --release
   ```

3. **Start the Frontend**
   ```bash
   # Back to root
   cd ..
   npm install
   npm run dev
   ```
   Access the dashboard at `http://localhost:5173`.

## 🦀 Soroban Contract Reference

Below is the interface of the deployed smart contract located in `contracts/swap/src/lib.rs`.

| Method      | Access      | Description                                                              |
| :---------- | :---------- | :----------------------------------------------------------------------- |
| `init`      | Admin       | Initializes the token pair and base exchange rate.                       |
| `deposit`   | Admin       | Allows the admin to deposit the reserve B liquidity.                     |
| `get_quote` | Public      | Instantly calculates expected output for a given amount.                 |
| `swap`      | Public/Auth | securely swaps `Token A` for `Token B` provided slippage isn't exceeded. |

## 🛡️ Security & Privacy

- **Non-Custodial**: This interface never asks for or stores your secret keys.
- **Freighter Signed**: All transactions are reviewed and securely signed within the Freighter extension.
- **Deterministic Smart Contracts**: On-chain logic verifies rates and asserts minimum received values to absolutely prevent slippage attacks.

## 🌉 Knowledge Base: Soroban Smart Contracts

By transitioning from Horizon API route-finding to native Soroban Smart contracts, DEX execution speeds are exponentially faster. Quotes are evaluated by simple on-chain mathematical curves rather than recursively searching across every node's liquidity pool.

---

Built with ❤️ for the Stellar Ecosystem.
