import { Connection, clusterApiUrl } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";

import type { HeliusResponse } from "@/types/helius";
import { RpcClient } from "helius-sdk";

let cache: HeliusResponse | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const HELIUS_RPC_URL =
  process.env.HELIUS_RPC_URL || clusterApiUrl("mainnet-beta");
const connection = new Connection(HELIUS_RPC_URL, "confirmed");
const rpcClient = new RpcClient(connection);

const COINGECKO_SOL_PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true";

async function fetchSolPrice(): Promise<{ price: number; change24h: number }> {
  try {
    const response = await fetch(COINGECKO_SOL_PRICE_URL);
    const data = await response.json();
    return {
      price: data.solana.usd || 0,
      change24h: data.solana.usd_24h_change || 0,
    };
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    return { price: 0, change24h: 0 };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HeliusResponse | { error: string }>,
) {
  const now = Date.now();

  if (cache && cacheTimestamp && now - cacheTimestamp < CACHE_TTL) {
    console.log("Returning cached data");
    return res.status(200).json(cache);
  }

  try {
    const blockhash = await rpcClient.getLatestBlockhash();

    let priorityFees;
    try {
      const priorityFeeResponse = await rpcClient.getPriorityFeeEstimate({
        options: { includeAllPriorityFeeLevels: true },
      });
      priorityFees = priorityFeeResponse?.priorityFeeLevels || {
        min: 0,
        low: 0,
        medium: 0,
        high: 0,
        veryHigh: 0,
      };
    } catch (priorityFeeError) {
      console.error("Error fetching priority fee estimates:", priorityFeeError);
      priorityFees = {
        min: 0,
        low: 0,
        medium: 0,
        high: 0,
        veryHigh: 0,
      };
    }

    const recentSamples = await connection.getRecentPerformanceSamples(10);

    const recentBlocks = await Promise.all(
      recentSamples.map(async (sample) => {
        const blockTime = await connection.getBlockTime(sample.slot);
        return {
          slot: sample.slot,
          numTransactions: sample.numTransactions,
          blockTime: blockTime ?? 0,
        };
      }),
    );

    const tps = await rpcClient.getCurrentTPS();

    const transactionVolume = recentSamples.reduce(
      (acc, sample) => acc + sample.numTransactions,
      0,
    );

    const { price: currentSolPrice, change24h: solPriceChange } =
      await fetchSolPrice();

    const networkHealth = tps > 1000 ? "Healthy" : "Unhealthy";

    const response: HeliusResponse = {
      blockhash,
      priorityFees,
      recentBlocks,
      tps,
      transactionVolume,
      networkHealth,
      solPrice: currentSolPrice,
      solPriceChange,
    };

    cache = response;
    cacheTimestamp = now;

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching Helius data:", error);

    if (cache) {
      console.log("Returning cached data as fallback");
      return res.status(200).json(cache);
    }

    res.status(500).json({ error: "Failed to fetch data from Helius" });
  }
}
