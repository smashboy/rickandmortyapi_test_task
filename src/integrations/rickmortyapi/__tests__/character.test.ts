import { getCharacter } from "../character";

describe("character", () => {
  test("should return selected character", async () => {
    const character = await getCharacter(1);

    expect(character).toBeInstanceOf(Object);
    expect(character?.name).toBe("Rick Sanchez");
  });

  test("should not find character", async () => {
    const character = await getCharacter(1022);

    expect(character).toBeNull();
  });
});
