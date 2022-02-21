import type { Character } from "rickmortyapi/dist/interfaces";
import { getCharactersPaginated, getCharactersSelected } from "../characters";

describe("characters/paginated", () => {
  test("should return first page", async () => {
    const response = await getCharactersPaginated(1);

    expect(response.status).toBe(200);
    expect(response.data.results).toBeInstanceOf(Array);
    expect(response.data.results?.length).toBe(20);
    expect(typeof response.data.info?.next).toBe("string");
  });

  test("should fetch next page", async () => {
    const firstResponse = await getCharactersPaginated(1);

    const nextCursor = parseInt(firstResponse.data.info?.next?.split("page=")[1] || "");

    expect(firstResponse.status).toBe(200);
    expect(typeof nextCursor).toBe("number");

    const secondResponse = await getCharactersPaginated(nextCursor);

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.data.results).toBeInstanceOf(Array);
    expect(secondResponse.data.results?.length).toBe(20);
    expect(typeof secondResponse.data.info?.next).toBe("string");
  });

  test("should not find the page", async () => {
    const response = await getCharactersPaginated(100);

    expect(response.status).toBe(404);
  });
});

describe("characters/liked", () => {
  test("should return 2 characters", async () => {
    const response = await getCharactersSelected([1, 2]);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    expect((response.data as Character[]).length).toBe(2);
  });

  test("should return 1 character object", async () => {
    const response = await getCharactersSelected([1]);

    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Object);
    expect((response.data as Character).name).toBe("Rick Sanchez");
  });

  test("should not find characters", async () => {
    const response = await getCharactersSelected([1002, 2404]);

    expect(response.status).toBe(200);
    expect((response.data as Character[]).length).toBe(0);
  });
});
