export function getRevenueData(leads) {
  const revenueMap = {};

  leads.forEach((lead) => {
    const date = lead.date;

    if (!revenueMap[date]) {
      revenueMap[date] = 0;
    }

    revenueMap[date] += lead.value;
  });

  return Object.entries(revenueMap).map(
    ([date, revenue]) => ({
      date,
      revenue,
    })
  );
}

export function getLeadDistribution(leads) {
  const statusMap = {
    Cold: 0,
    Warm: 0,
    Hot: 0,
  };

  leads.forEach((lead) => {
    statusMap[lead.status] += 1;
  });

  return Object.entries(statusMap).map(
    ([status, count]) => ({
      name: status,
      value: count,
    })
  );
}