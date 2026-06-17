/**
 * =====================================================
 * FILE: lead-chart.tsx
 * PROJECT: Burney Real Estate Portal
 *
 * PURPOSE:
 * Premium lead analytics chart for admin dashboard.
 * Uses Recharts for data visualization.
 * =====================================================
 */

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
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Lead Analytics
        </h3>
        <p className="text-sm text-white/45">
          Monthly lead growth overview
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="leadGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EBCB4C" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#EBCB4C" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />

            <Tooltip
              contentStyle={{
                background: "#080808",
                border: "1px solid rgba(235,203,76,0.25)",
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