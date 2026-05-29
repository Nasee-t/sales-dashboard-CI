import { render, screen } from "@testing-library/react";
import Board from "../components/pipeline/Board";
import { describe, test, expect } from "@jest/globals";

const mockMoveLead = jest.fn();

// jest.mock("../features/leads/useLeads", () => ({
//   useLeads: () => ({
//     leads: [
//       {
//         id: 1,
//         client_name: "Lead A",
//         status: "Cold",
//         value: 500,
//       },
//       {
//         id: 2,
//         client_name: "Lead B",
//         status: "Warm",
//         value: 800,
//       },
//     ],
//     moveLead: jest.fn(),
//   }),
// }));

jest.mock("../features/leads/useLeads", () => ({
  useLeads: () => ({
    leads: [
      {
        id: 1,
        client_name: "Lead A",
        status: "Cold",
        value: 500,
      },
    ],
    moveLead: mockMoveLead,
  }),
}));

let capturedOnDragEnd;

jest.mock("@dnd-kit/core", () => ({
  DndContext: ({ children, onDragEnd }) => {
    capturedOnDragEnd = onDragEnd;

    return <div>{children}</div>;
  },

  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
  }),

  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
  }),
}));

describe("Board", () => {
  test("renders leads from state", () => {
    render(<Board />);

    expect(screen.getByText("Lead A")).toBeInTheDocument();

    // expect(screen.getByText("Lead B")).toBeInTheDocument();
  });

  test("renders all status columns", () => {
    render(<Board />);

    expect(screen.getByText("Cold")).toBeInTheDocument();

    expect(screen.getByText("Warm")).toBeInTheDocument();

    expect(screen.getByText("Hot")).toBeInTheDocument();
  });

  test("moves lead to new column on drag end", () => {
    render(<Board />);

    capturedOnDragEnd({
      active: {
        id: 1,
      },

      over: {
        id: "Hot",
      },
    });

    expect(mockMoveLead).toHaveBeenCalledWith(1, "Hot");
  });
});
