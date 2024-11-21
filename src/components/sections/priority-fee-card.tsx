import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

interface PriorityFeeCardProps {
  priorityFees?: {
    min: number;
    low: number;
    medium: number;
    high: number;
    veryHigh: number;
  } | null;
  selectedLevel: "min" | "low" | "medium" | "high" | "veryHigh";
}

export function PriorityFeeCard({
  priorityFees,
  selectedLevel,
}: PriorityFeeCardProps) {
  const fee =
    priorityFees && priorityFees[selectedLevel] != null
      ? priorityFees[selectedLevel].toFixed(2)
      : "Loading...";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Priority Fee ({selectedLevel})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{fee} µL/CU</div>
      </CardContent>
    </Card>
  );
}
