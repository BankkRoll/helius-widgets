// types/helius.ts

import type { BlockhashWithExpiryBlockHeight } from "@solana/web3.js";

export interface HeliusPriorityFeeData {
  min: number;
  low: number;
  medium: number;
  high: number;
  veryHigh: number;
}

export interface HeliusPerformanceSample {
  slot: number;
  numTransactions: number;
  blockTime?: number | null;
}

export interface HeliusResponse {
  blockhash: BlockhashWithExpiryBlockHeight;
  priorityFees: HeliusPriorityFeeData;
  recentBlocks: HeliusPerformanceSample[];
  tps: number;
  transactionVolume: number;
  networkHealth: string;
  solPrice: number;
  solPriceChange: number;
}
