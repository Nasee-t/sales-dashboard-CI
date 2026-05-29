import { useContext } from "react";
import { LeadsContext } from "./LeadsContext";

export function useLeads() {
  return useContext(LeadsContext);
}