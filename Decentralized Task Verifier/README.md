# Decentralized Task Verifier

A fully functional Web3 mini-dApp built to demonstrate loading states, progress indicators, caching, and comprehensive testing in a modern React+Solidity stack.

## Live Demo

**[Live Demo Link (Vercel) - Placeholder]** _(Replace with actual Vercel/Netlify link after deployment)_

## Demo Video

**[Demo Video Link (Loom/YouTube) - Placeholder]** _(Replace with actual 1-minute video link)_

## Tech Stack

- **Smart Contract:** Solidity (0.8.20), Hardhat
- **Frontend:** React.js (Vite), TypeScript, Tailwind CSS
- **Web3 Integration:** Ethers.js v6
- **State & Caching:** React Query (TanStack Query)
- **UI/UX:** Framer Motion, React Hot Toast, Lucide Icons

## Features Highlights

- **Submission System:** Any user can submit a task/report on-chain.
- **Verification System:** Only the owner can mark a task as verified.
- **Optimistic Updates & Caching:** React Query fetches and caches reports for instant loads, minimizing RPC calls.
- **Loading States:** Implemented transactional toast notifications ("Pending -> Success/Error").
- **Security:** Role-based access embedded in smart contract modifiers.

## Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Decentralized-Task-Verifier.git
cd Decentralized-Task-Verifier

# 2. Install dependencies
npm install

# 3. Start local Hardhat node (in a separate terminal)
npx hardhat node

# 4. Deploy smart contract locally (in another terminal)
npx hardhat run scripts/deploy.cjs --network localhost

# 5. Start the Vite React development server
npm run dev
```

## Test Results

Running the test suite yields 3+ passing tests covering deployment, event emissions, and role-based access control.

![Test Screenshot](./test-output.png)
_(Alternatively, you can just paste the terminal output here)_

```bash
  TaskVerifier
    Deployment
      ✔ Should set the right owner
      ✔ Should start with 0 reports
    Transactions
      ✔ Should emit ReportCreated event when creating a report
      ✔ Should revert if a non-owner tries to verify
      ✔ Should emit ReportVerified event when owner verifies

  5 passing (1.2s)
```

## Contributing

Meaningful commits follow standard conventional commit guidelines (`feat:`, `fix:`, `test:`, `docs:`).

## License

MIT
