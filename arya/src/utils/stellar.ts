import { Horizon } from "stellar-sdk";

export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const FRIENDBOT_URL = "https://friendbot.stellar.org";

export const server = new Horizon.Server(HORIZON_URL);

export const fetchXLMBalance = async (publicKey: string): Promise<string> => {
  try {
    const account = await server.loadAccount(publicKey);
    const nativeBalance = account.balances.find((b) => b.asset_type === "native");
    return nativeBalance ? nativeBalance.balance : "0";
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Account not created yet
      return "0";
    }
    throw error;
  }
};

export const requestTestnetXLM = async (publicKey: string): Promise<string> => {
  const response = await fetch(`${FRIENDBOT_URL}?addr=${publicKey}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Friendbot request failed");
  }
  const data = await response.json();
  return data.hash;
};
