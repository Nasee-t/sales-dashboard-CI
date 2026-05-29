import { DndContext } from "@dnd-kit/core";
import Column from "./Column";
import { useLeads } from "../../features/leads/useLeads";

function Board() {
  const { leads, moveLead } = useLeads();

  const coldLeads = leads.filter((lead) => lead.status === "Cold");

  const warmLeads = leads.filter((lead) => lead.status === "Warm");

  const hotLeads = leads.filter((lead) => lead.status === "Hot");

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const leadId = active.id;
    const newStatus = over.id;

    const draggedLead = leads.find((lead) => lead.id === leadId);

    if (!draggedLead) return;

    if (draggedLead.status === newStatus) {
      return;
    }

    moveLead(leadId, newStatus);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="Cold" leads={coldLeads} />
        <Column title="Warm" leads={warmLeads} />
        <Column title="Hot" leads={hotLeads} />
      </div>
    </DndContext>
  );
}

export default Board;
