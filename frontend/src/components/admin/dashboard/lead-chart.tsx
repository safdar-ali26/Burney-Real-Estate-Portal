"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  { month: "Jan", leads: 42 },
  { month: "Feb", leads: 58 },
  { month: "Mar", leads: 73 },
  { month: "Apr", leads: 96 },
  { month: "May", leads: 125 },
  { month: "Jun", leads: 168 },
];

export default function LeadChart() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Lead Analytics
        </h3>

        <p className="text-sm text-muted-foreground">
          Monthly lead growth overview
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EBCB4C" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#EBCB4C" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(120,120,120,0.12)"
            />

            <XAxis
              dataKey="month"
              stroke="rgba(120,120,120,0.7)"
            />

            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid rgba(235,203,76,.25)",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#EBCB4C"
              strokeWidth={3}
              fill="url(#leadGold)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}