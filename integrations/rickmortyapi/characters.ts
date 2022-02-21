import { getCharacters, getCharacter } from "rickmortyapi";
import type { Character, ApiResponse } from "rickmortyapi/dist/interfaces";

export function getCharactersPaginated(page: number, filter?: string) {
  // Package bug
  // Result will be empty if you pass name: undefined
  const options = filter ? { page, name: filter } : { page };

  return getCharacters(options);
}

export function getCharactersSelected(
  ids: number[]
): Promise<ApiResponse<Character | Character[]>> {
  return getCharacter(ids);
}
