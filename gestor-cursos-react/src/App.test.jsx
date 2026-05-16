import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { getCourses } from "./services/courseService";

vi.mock("./services/courseService", () => ({
  getCourses: vi.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    document.body.classList.remove("dark-mode");
  });

  it("carga cursos, filtra por docente, alterna dark mode y maneja favoritos", async () => {
    getCourses.mockResolvedValueOnce([
      { id: 1, title: "React basico", description: "Intro", teacherId: 1 },
      { id: 2, title: "Seguridad web", description: "OWASP", teacherId: 2 },
    ]);

    render(<App />);

    await screen.findByText("React basico");
    expect(screen.getByText("Seguridad web")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Modo oscuro"));
    expect(document.body.classList.contains("dark-mode")).toBe(true);

    fireEvent.click(screen.getAllByRole("button", { name: "Agregar a favoritos" })[0]);
    expect(
      screen.getByText((_, element) =>
        element?.textContent?.replace(/\s+/g, " ").trim() === "Favoritos: 1"
      )
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Filtrar por docente:"), { target: { value: "2" } });
    await waitFor(() => {
      expect(screen.queryByText("React basico")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Seguridad web")).toBeInTheDocument();
  });

  it("muestra error y permite reintentar carga", async () => {
    getCourses
      .mockRejectedValueOnce(new Error("fallo de red"))
      .mockResolvedValueOnce([{ id: 3, title: "Node avanzado", description: "Async", teacherId: 3 }]);

    render(<App />);

    await screen.findByText("fallo de red");
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    await screen.findByText("Node avanzado");
    expect(getCourses).toHaveBeenCalledTimes(2);
  });
});
