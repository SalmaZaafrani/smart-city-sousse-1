import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getAirQualityHistory } from "@/api/api";

interface AirQualityPoint {
  timestamp: string;
  aqi: number;
}

export function AirQualityChart() {
  const [data, setData] = useState<AirQualityPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAirQualityHistory()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-5">Chargement des données AQI...</div>;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Air Quality Index (24h)
        </h3>
        <p className="text-sm text-muted-foreground">
          Real-time AQI monitoring across Sousse
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.4} />
                <stop offset="95%" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="timestamp" tickMargin={10} />
            <YAxis domain={[0, 150]} tickMargin={10} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="aqi"
              strokeWidth={2}
              fill="url(#aqiGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
