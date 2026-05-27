// src/tests/app.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import PlantForm from "../components/PlantForm";
import PlantCard from "../components/PlantCard";
import PlantList from "../components/PlantList";
import * as api from "../services/api";

jest.mock("../services/api");

const mockPlants = [
  {
    id: 1,
    name: "Rose",
    wateringFrequency: "Every 2 days",
    lastWateredDate: "2025-08-10",
  },
  {
    id: 2,
    name: "Tulip",
    wateringFrequency: "Weekly",
    lastWateredDate: "2025-08-05",
  },
];

describe("Plant Care Scheduler - Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Renders app title
  test("React_BuildUIComponents_renders app title", () => {
    api.getPlants.mockResolvedValue([]);
    render(<App />);
    const header = screen.getByRole("heading", { level: 1, name: /Plant Care Scheduler/i });
    expect(header).toBeInTheDocument();
  });

  // 2. Fetches and displays plant list
  test("React_APIIntegration_TestingAndAPIDocumentation_fetches and displays plants", async () => {
    api.getPlants.mockResolvedValueOnce({ data: mockPlants });
    render(<App />);
    expect(await screen.findByText("Rose")).toBeInTheDocument();
    expect(screen.getByText("Tulip")).toBeInTheDocument();
  });

  // 3. Shows empty list if no plants
  test("React_APIIntegration_TestingAndAPIDocumentation_shows empty list if no plants", async () => {
    api.getPlants.mockResolvedValueOnce({ data: [] });
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText("Rose")).not.toBeInTheDocument();
    });
  });

  // 4. Handles fetch error gracefully
  test("React_BuildUIComponents_handles fetch error gracefully", async () => {
    api.getPlants.mockRejectedValueOnce(new Error("Fetch error"));
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1 })).toBeInTheDocument();
  });


  // 5. Adds a new plant
  test("React_APIIntegration_TestingAndAPIDocumentation_submits form to add plant", async () => {
    const addMock = jest.fn();
    render(<PlantForm onSubmit={addMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Plant Name/i), { target: { value: "Lily" } });
    fireEvent.change(screen.getByPlaceholderText(/Watering Frequency/i), { target: { value: "Daily" } });
    fireEvent.change(screen.getByDisplayValue(""), { target: { value: "2025-08-12" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Plant/i }));
    expect(addMock).toHaveBeenCalledWith({
      name: "Lily",
      wateringFrequency: "Daily",
      lastWateredDate: "2025-08-12",
    });
  });

  // 6. Edit plant button triggers edit
  test("React_BuildUIComponents_edit button calls onEdit", () => {
    const onEditMock = jest.fn();
    render(<PlantCard plant={mockPlants[0]} onEdit={onEditMock} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    expect(onEditMock).toHaveBeenCalledWith(mockPlants[0]);
  });

  // 7. Delete plant button triggers delete
  test("React_BuildUIComponents_delete button calls onDelete", () => {
    const onDeleteMock = jest.fn();
    render(<PlantCard plant={mockPlants[0]} onEdit={jest.fn()} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });

  // 8. PlantList renders all plants
  test("React_BuildUIComponents_PlantList renders all plants", () => {
    render(<PlantList plants={mockPlants} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("Rose")).toBeInTheDocument();
    expect(screen.getByText("Tulip")).toBeInTheDocument();
  });
  // 9. Adds plant through App component
  test("React_APIIntegration_TestingAndAPIDocumentation_calls addPlant API when adding a plant", async () => {
    api.getPlants.mockResolvedValueOnce({ data: [] });
    api.addPlant.mockResolvedValueOnce({});
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Plant Name/i), { target: { value: "Orchid" } });
    fireEvent.change(screen.getByPlaceholderText(/Watering Frequency/i), { target: { value: "Every 3 days" } });
    fireEvent.change(screen.getByDisplayValue(""), { target: { value: "2025-08-15" } });
    fireEvent.click(screen.getByRole("button", { name: /Add Plant/i }));
    await waitFor(() => {
      expect(api.addPlant).toHaveBeenCalledWith({
        name: "Orchid",
        wateringFrequency: "Every 3 days",
        lastWateredDate: "2025-08-15",
      });
    });
  });
  // 10. Prefills form when editing a plant
  test("React_BuildUIComponents_prefills form fields when selectedPlant is passed", () => {
    render(<PlantForm onSubmit={jest.fn()} selectedPlant={mockPlants[0]} />);
    expect(screen.getByPlaceholderText(/Plant Name/i).value).toBe("Rose");
    expect(screen.getByPlaceholderText(/Watering Frequency/i).value).toBe("Every 2 days");
    expect(screen.getByDisplayValue("2025-08-10")).toBeInTheDocument();
  });
});
