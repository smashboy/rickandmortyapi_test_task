import { getCharacters, getCharacter } from "rickmortyapi";

export function getCharactersPaginated(page: number, filter?: string) {
  // Package bug
  // Result will be empty if you pass name: undefined
  const options = filter ? { page, name: filter } : { page };

  return getCharacters(options);
}

export function getCharactersSelected(ids: number[]) {
  return getCharacter(ids);
}
