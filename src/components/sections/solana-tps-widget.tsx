import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface SolanaTPSWidgetProps {
  tps?: number;
}

export function SolanaTPSWidget({ tps = 0 }: SolanaTPSWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solana TPS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{tps || "Loading..."}</div>
      </CardContent>
    </Card>
  );
}
