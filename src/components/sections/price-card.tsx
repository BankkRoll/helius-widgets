import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface PriceCardProps {
  currentPrice?: number; // The SOL price (in USD) as a float
  priceChange?: number; // The percentage change in price as a float
}

export function PriceCard({
  currentPrice = 0,
  priceChange = 0,
}: PriceCardProps) {
  const isPositive = priceChange >= 0;

  // Correctly format the price as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(currentPrice);

  // Correctly format the percentage change
  const formattedChange = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(priceChange));

  return (
    <Card>
      <CardHeader>
        <CardTitle>SOL Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{formattedPrice}</div>
          <div
            className={`flex items-center ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : "-"}
            {formattedChange}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
