import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("renderiza y dispara el cambio de modo oscuro", () => {
    const onToggleDarkMode = vi.fn();

    render(<Header darkMode={false} onToggleDarkMode={onToggleDarkMode} />);

    fireEvent.click(screen.getByLabelText("Modo oscuro"));
    expect(onToggleDarkMode).toHaveBeenCalledWith(true);
  });
});
