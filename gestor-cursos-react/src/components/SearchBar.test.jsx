import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("actualiza búsqueda y docente seleccionado", () => {
    const onSearchChange = vi.fn();
    const onTeacherChange = vi.fn();

    render(
      <SearchBar
        searchTerm=""
        onSearchChange={onSearchChange}
        teacherIds={["1", "2"]}
        selectedTeacher=""
        onTeacherChange={onTeacherChange}
      />
    );

    fireEvent.change(screen.getByLabelText("Buscar curso:"), { target: { value: "react" } });
    fireEvent.change(screen.getByLabelText("Filtrar por docente:"), { target: { value: "2" } });

    expect(onSearchChange).toHaveBeenCalledWith("react");
    expect(onTeacherChange).toHaveBeenCalledWith("2");
    expect(screen.getByRole("option", { name: "Docente 1" })).toBeInTheDocument();
  });
});
