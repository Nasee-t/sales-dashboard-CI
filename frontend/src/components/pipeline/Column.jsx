import { useDroppable } from "@dnd-kit/core";
import LeadCard from "./LeadCard";

function Column({ title, leads }) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <div ref={setNodeRef} className={`bg-slate-300 rounded-xl p-4 min-h-[400px] transition ${isOver ? "bg-slate-300" : "bg-slate-200"}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {leads.length === 0 ? (
          <div className="border-2 border-slate-300 rounded-lg p-6 text-center text-slate-400">
            No leads here
          </div>
        ) : (
          leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
        )}
      </div>
    </div>
  );
}

export default Column;
