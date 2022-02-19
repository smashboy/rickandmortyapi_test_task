import { getCharacters, getCharacter } from "rickmortyapi";

export function getCharactersPaginated(page: number) {
  return getCharacters({ page });
}

export function getCharactersSelected(ids: number[]) {
  return getCharacter(ids);
}
