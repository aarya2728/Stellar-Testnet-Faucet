/// <reference types="vite/client" />

interface Window {
  ethereum?: any;
}

declare module '../artifacts/contracts/TaskVerifier.sol/TaskVerifier.json' {
  const value: any;
  export default value;
}
