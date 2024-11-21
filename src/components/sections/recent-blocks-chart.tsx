import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import React from "react";

interface RecentBlocksChartProps {
  priceData?: { slot: number; numTransactions: number; blockTime: number }[];
}

export function RecentBlocksChart({ priceData = [] }: RecentBlocksChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Block Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {priceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="slot"
                  label={{
                    value: "Slot",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Transactions",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="numTransactions"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
