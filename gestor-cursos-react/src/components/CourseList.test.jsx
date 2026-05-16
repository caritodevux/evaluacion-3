import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CourseList from "./CourseList";

describe("CourseList", () => {
  it("muestra mensaje cuando no hay cursos", () => {
    render(<CourseList courses={[]} favorites={[]} onToggleFavorite={vi.fn()} />);
    expect(screen.getByText("No se encontraron cursos.")).toBeInTheDocument();
  });

  it("renderiza tarjetas cuando hay cursos", () => {
    const courses = [
      { id: 1, title: "React", description: "desc", teacherId: 1 },
      { id: 2, title: "Node", description: "desc", teacherId: 2 },
    ];

    render(<CourseList courses={courses} favorites={[courses[1]]} onToggleFavorite={vi.fn()} />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node")).toBeInTheDocument();
  });
});
