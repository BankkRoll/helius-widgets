import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface NetworkHealthWidgetProps {
  healthStatus?: string;
}

export function NetworkHealthWidget({
  healthStatus = "Unknown",
}: NetworkHealthWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${
            healthStatus === "Healthy" ? "text-green-500" : "text-red-500"
          }`}
        >
          {healthStatus}
        </div>
      </CardContent>
    </Card>
  );
}
