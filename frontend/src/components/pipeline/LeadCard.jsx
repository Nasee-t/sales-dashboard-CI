import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function LeadCard({ lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="
        bg-white
        rounded-lg
        shadow
        p-4
        cursor-grab
        hover:shadow-lg
        transition
        active:cursor-grabbing
        "
    >
      <h3 className="font-semibold text-lg">
        {lead.client_name}
      </h3>

      <p className="text-slate-600 mt-1">
        ${lead.value}
      </p>
    </div>
  );
}

export default LeadCard;