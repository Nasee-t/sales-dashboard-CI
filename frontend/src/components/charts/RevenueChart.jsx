import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function RevenueChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-80">
      <h2 className="text-xl font-semibold mb-4">
        Revenue Timeline
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data}>
          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;