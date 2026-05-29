import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import api from "../api/api";
import LeadsProvider from "../features/leads/LeadsProvider";
import { useLeads } from "../features/leads/useLeads";

jest.mock("../api/api", () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

api.get();
api.patch();

function TestComponent() {
  const { leads, moveLead } = useLeads();

  if (!leads.length) {
    return <p>Loading Leads</p>;
  }

  return (
    <div>
      <p>{leads[0].status}</p>

      <button onClick={() => moveLead(leads[0].id, "Hot")}>Move Lead</button>
    </div>
  );
}

describe("LeadsProvider", () => {
  test("optimistically updates lead status", async () => {
    api.get.mockResolvedValue({
      data: [
        {
          id: 1,
          client_name: "Lead A",
          status: "Cold",
          value: 500,
          date: "2024-05-01",
        },
      ],
    });

    api.patch.mockResolvedValue({
      data: { success: true },
    });

    render(
      <LeadsProvider>
        <TestComponent />
      </LeadsProvider>,
    );

    expect(await screen.findByText("Cold")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Move Lead"));

    expect(screen.getByText("Hot")).toBeInTheDocument();

    expect(api.patch).toHaveBeenCalledWith("/leads/1", {
      status: "Hot",
    });
  });

  test("rolls back optimistic update if API fails", async () => {
    api.get.mockResolvedValue({
      data: [
        {
          id: 1,
          client_name: "Lead A",
          status: "Cold",
          value: 500,
          date: "2024-05-01",
        },
      ],
    });

    api.patch.mockImplementation(
      () =>
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Patch failed"));
          }, 100);
        }),
    );

    render(
      <LeadsProvider>
        <TestComponent />
      </LeadsProvider>,
    );

    expect(await screen.findByText("Cold")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Move Lead"));

    expect(screen.getByText("Hot")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Cold")).toBeInTheDocument();
    });
  });
});
