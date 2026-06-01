import { useMemo } from "react";
import RevenueChart from "../components/charts/RevenueChart";
import LeadPieChart from "../components/charts/LeadPieChart";
import Board from "../components/pipeline/Board";
import Spinner from "../components/ui/Spinner";

import { useLeads } from "../features/leads/useLeads";
import {
  getRevenueData,
  getLeadDistribution,
} from "../features/leads/leads.utils";

function Dashboard() {
  const { leads, loading } = useLeads();

  const revenueData = useMemo(() => getRevenueData(leads), [leads]);

  const distributionData = useMemo(() => getLeadDistribution(leads), [leads]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen p-6">
      {/* header */}
      <h1 className="text-3xl font-bold mb-6">Sales Command Center</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart data={revenueData} />
        <LeadPieChart data={distributionData} />
      </div>

      <Board />
    </div>
  );
}

export default Dashboard;
