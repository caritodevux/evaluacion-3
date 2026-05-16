import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CourseCard from "./CourseCard";

describe("CourseCard", () => {
  it("renderiza datos del curso y permite agregar/quitar favoritos", () => {
    const onToggleFavorite = vi.fn();
    const course = {
      id: 1,
      title: "Curso React",
      description: "Hooks y componentes",
      teacherId: 9,
    };

    const { rerender } = render(
      <CourseCard course={course} isFavorite={false} onToggleFavorite={onToggleFavorite} />
    );

    expect(screen.getByText("Curso React")).toBeInTheDocument();
    expect(screen.getByText("Hooks y componentes")).toBeInTheDocument();
    expect(screen.getByText("Docente ID: 9")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Agregar a favoritos" }));
    expect(onToggleFavorite).toHaveBeenCalledWith(course);

    rerender(<CourseCard course={course} isFavorite={true} onToggleFavorite={onToggleFavorite} />);
    expect(screen.getByRole("button", { name: "Quitar de favoritos" })).toBeInTheDocument();
  });
});
