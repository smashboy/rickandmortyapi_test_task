import { CharacterSearchProvider } from "./Context";
import { CharactersSearchInput } from "./Input";

export function CharactersSearch() {
  return (
    <CharacterSearchProvider>
      <CharactersSearchInput />
    </CharacterSearchProvider>
  );
}
