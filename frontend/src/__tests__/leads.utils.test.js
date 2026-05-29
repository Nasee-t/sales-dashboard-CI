import {
  getRevenueData,
  getLeadDistribution,
} from "../features/leads/leads.utils";
import { describe, test, expect } from '@jest/globals'

describe('sum', () => {
  test('adds numbers', () => {
    expect(1 + 1).toBe(2)
  })
})

describe("leads utils", () => {
  const mockLeads = [
    {
      id: 1,
      status: "Cold",
      value: 500,
      date: "2024-05-01",
    },
    {
      id: 2,
      status: "Warm",
      value: 300,
      date: "2024-05-01",
    },
    {
      id: 3,
      status: "Hot",
      value: 700,
      date: "2024-05-02",
    },
  ];

  test("groups revenue by date correctly", () => {
    const result = getRevenueData(mockLeads);

    expect(result).toEqual([
      {
        date: "2024-05-01",
        revenue: 800,
      },
      {
        date: "2024-05-02",
        revenue: 700,
      },
    ]);
  });

  test("groups leads by status correctly", () => {
    const result = getLeadDistribution(mockLeads);

    expect(result).toEqual([
      { name: "Cold", value: 1 },
      { name: "Warm", value: 1 },
      { name: "Hot", value: 1 },
    ]);
  });
});