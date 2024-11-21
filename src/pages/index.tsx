import React, { useEffect, useState } from "react";

import { BlockhashWidget } from "@/components/sections/blockhash-widget";
import type { HeliusResponse } from "@/types/helius";
import { NetworkHealthWidget } from "@/components/sections/network-health-widget";
import { PriceCard } from "@/components/sections/price-card";
import { PriorityFeeCard } from "@/components/sections/priority-fee-card";
import { RecentBlocksChart } from "@/components/sections/recent-blocks-chart";
import { SolanaTPSWidget } from "@/components/sections/solana-tps-widget";
import { TransactionVolumeWidget } from "@/components/sections/transaction-volume-widget";

export default function Home() {
  const [data, setData] = useState<HeliusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/helius-data");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const heliusData: HeliusResponse = await response.json();
        setData(heliusData);
        setError(null);
      } catch (err) {
        console.error("Error fetching Helius data:", err);
        setError("Failed to fetch Helius data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const normalizedRecentBlocks =
    data?.recentBlocks?.map((block) => ({
      slot: block.slot,
      numTransactions: block.numTransactions,
      blockTime: block.blockTime ?? 0,
    })) || [];

  return (
    <div className="min-h-screen p-4">
      {error ? (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PriceCard
              currentPrice={data.solPrice}
              priceChange={data.solPriceChange}
            />
            <PriorityFeeCard
              priorityFees={data?.priorityFees ?? null}
              selectedLevel="medium"
            />
            <BlockhashWidget
              blockhash={data?.blockhash?.blockhash ?? "Unavailable"}
            />
            <TransactionVolumeWidget
              totalVolume={data?.transactionVolume ?? 0}
            />
            <SolanaTPSWidget tps={data?.tps ?? 0} />
            <NetworkHealthWidget
              healthStatus={data?.networkHealth ?? "Unknown"}
            />
          </div>
          <div>
            <RecentBlocksChart priceData={normalizedRecentBlocks} />
          </div>
        </div>
      )}
    </div>
  );
}
