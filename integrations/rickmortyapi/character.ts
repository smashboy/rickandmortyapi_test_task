import { getCharacter as apiGetCharacter, getEpisode } from "rickmortyapi";
import type { Character } from "./types";

export async function getCharacter(charactedId: number): Promise<Character | null> {
  const character = await apiGetCharacter(charactedId);

  if (character.status === 404) return null;
  if (character.status !== 200) throw new Error(character.statusMessage);

  const { episode: episodesUrl, ...otherCharacterProps } = character.data;

  const episodeIds = [];

  for (const url of episodesUrl) {
    const id = parseInt(url.split("/episode/")[1]);

    if (Number.isNaN(id)) continue;

    episodeIds.push(id);
  }

  const episodes = await getEpisode(episodeIds);

  return {
    ...otherCharacterProps,
    episodes: episodes.data,
  };
}
