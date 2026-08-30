'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type VisitorTrendPoint = {
  date: string;
  visitors: number;
  sessions: number;
  newVisitors: number;
  returningVisitors: number;
};

export function VisitorAnalyticsLineChart({ data }: { data: VisitorTrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 12, right: 20, bottom: 0, left: -20 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#a1a1aa', fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: '#a1a1aa', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: '#111113',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8,
            color: '#fff',
          }}
        />
        <Legend wrapperStyle={{ color: '#d4d4d8', fontSize: 12 }} />
        <Line type="monotone" dataKey="visitors" stroke="#4F8CFF" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="sessions" stroke="#34d399" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="newVisitors" stroke="#fbbf24" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="returningVisitors" stroke="#f472b6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
