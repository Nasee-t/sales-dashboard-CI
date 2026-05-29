import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const STATUS_COLORS = {
  Cold: "#60a5fa",
  Warm: "#facc15",
  Hot: "#f87171",
};

function LeadPieChart({ data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-80">
      <h2 className="text-xl font-semibold mb-4">Lead Distribution</h2>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LeadPieChart;
