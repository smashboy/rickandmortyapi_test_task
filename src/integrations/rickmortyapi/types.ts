import { Character as ApiCharacter, Episode } from "rickmortyapi/dist/interfaces";

export interface Character extends Omit<ApiCharacter, "episode"> {
  episodes: Episode[];
}
