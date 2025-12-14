import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { getCo2SavingsData } from "@/api/api";

interface Co2DataPoint {
  month: string;
  savings: number;
  vehicles: number;
}

export function Co2SavingsChart() {
  const [data, setData] = useState<Co2DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCo2SavingsData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-5">Chargement des données CO₂...</div>;

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
          <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.3} />
                <stop offset="95%" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickMargin={10} />
            <YAxis yAxisId="left" tickMargin={10} tickFormatter={v => `${v}kg`} />
            <YAxis yAxisId="right" orientation="right" tickMargin={10} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="savings"
              name="CO₂ Saved (kg)"
              strokeWidth={3}
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="vehicles"
              name="Active Vehicles"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
