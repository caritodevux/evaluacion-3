import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import { getCourses } from "./courseService";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getCourses", () => {
  it("mapea la respuesta de la API a cursos", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, title: "react", body: "descripcion", userId: 77 }],
    });

    const result = await getCourses();

    expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts");
    expect(result).toEqual([
      { id: 1, title: "react", description: "descripcion", teacherId: 77 },
    ]);
  });

  it("relanza un error con causa cuando falla la API", async () => {
    const originalError = new Error("fallo de red");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(originalError);

    await getCourses().catch((error) => {
      expect(error.message).toBe("No fue posible cargar los cursos.");
      expect(error.cause).toBe(originalError);
    });

    errorSpy.mockRestore();
  });
});
