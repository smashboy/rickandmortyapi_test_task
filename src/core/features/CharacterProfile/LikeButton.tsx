import LikeIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { ArrowTooltip } from "core/components/ArrowTooltip";
import { usePersistentState } from "core/hooks/usePersistentState";
import { useSession } from "core/hooks/useSession";
import { useCallback, useMemo } from "react";
import { useCharacterProfile } from "./Context";

export function LikeCharacterButton() {
  const session = useSession();

  const { character } = useCharacterProfile();

  const storedLikedCharacters = usePersistentState<number[]>(
    `liked-characters-${session.data?.user?.email}`,
    session.data?.user?.email ? [] : undefined
  );

  const isLiked = useMemo(
    () => storedLikedCharacters.value?.includes(character.id) || false,
    [storedLikedCharacters]
  );

  const handleLikeCharacter = useCallback(() => {
    const prevState = storedLikedCharacters.value || [];

    if (prevState.includes(character.id))
      return storedLikedCharacters.set(prevState.filter((id) => id !== character.id));

    storedLikedCharacters.set([...prevState, character.id]);
  }, [storedLikedCharacters]);

  if (!session.data?.user) return null;

  return (
    <ArrowTooltip title={isLiked ? "Unlike character" : "Like character"}>
      <IconButton onClick={handleLikeCharacter}>
        <LikeIcon color={isLiked ? "error" : undefined} />
      </IconButton>
    </ArrowTooltip>
  );
}
