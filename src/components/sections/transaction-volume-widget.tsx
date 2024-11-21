import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface TransactionVolumeWidgetProps {
  totalVolume?: number;
}

export function TransactionVolumeWidget({
  totalVolume = 0,
}: TransactionVolumeWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Volume (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {(totalVolume / 1_000_000).toFixed(2)}M
        </div>
      </CardContent>
    </Card>
  );
}
