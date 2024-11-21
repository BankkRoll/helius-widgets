import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface BlockhashWidgetProps {
  blockhash?: string | null;
}

export function BlockhashWidget({ blockhash }: BlockhashWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Blockhash</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-mono break-all">
          {blockhash || "Fetching blockhash..."}
        </div>
      </CardContent>
    </Card>
  );
}
