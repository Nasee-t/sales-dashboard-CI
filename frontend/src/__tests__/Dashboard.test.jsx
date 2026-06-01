import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { useLeads } from "../features/leads/useLeads";

jest.mock("../features/leads/useLeads", () => ({
  useLeads: jest.fn(),
}));

describe("Dashboard", () => {
  test("shows spinner while loading", () => {
    useLeads.mockReturnValue({
      leads: [],
      loading: true,
    });

    render(<Dashboard />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders dashboard content after loading", () => {
    useLeads.mockReturnValue({
      leads: [],
      loading: false,
    });

    render(<Dashboard />);

    expect(screen.getByText("Sales Command Center")).toBeInTheDocument();
  });
});
