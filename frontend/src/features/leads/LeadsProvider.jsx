import { useEffect, useState } from "react";
import api from "../../api/api";
import { LeadsContext } from "./LeadsContext";

function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await api.get("/leads");
        setLeads(response.data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  async function moveLead(id, newStatus) {
    // Save old state for rollback
    const previousLeads = leads;

    // Optimistic update
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead,
      ),
    );

    try {
      await api.patch(`/leads/${id}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Failed to update lead:", error);

      // Rollback if request fails
      setLeads(previousLeads);
    }
  }

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        moveLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export default LeadsProvider;
