import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { co2SavingsData } from '@/data/mockData';

export function Co2SavingsChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          CO₂ Savings from Autonomous Vehicles
        </h3>
        <p className="text-sm text-muted-foreground">
          Monthly environmental impact tracking
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={co2SavingsData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(v) => `${v}kg`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>
              )}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="savings"
              name="CO₂ Saved (kg)"
              stroke="hsl(var(--chart-2))"
              strokeWidth={3}
              dot={{
                fill: 'hsl(var(--chart-2))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(var(--chart-2))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="vehicles"
              name="Active Vehicles"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: 'hsl(var(--chart-4))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
                r: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}