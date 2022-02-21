import { forwardRef, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import type { Components } from "react-virtuoso";
import { List } from "@mui/material";
import type { Character } from "rickmortyapi/dist/interfaces";
import { VirtualListItem } from "core/components/VirtualListItem";
import { CharacterListItem } from "./ListItem";
import { useSession } from "core/hooks/useSession";
import { usePersistentState } from "core/hooks/usePersistentState";
import { fetchHelper } from "utils/client";
import { useQuery } from "react-query";
import { useCharactersList } from "./Context";

interface FetchLikedCharactersProps {
  queryKey: readonly unknown[];
}

function fetchLikedCharacters(props: FetchLikedCharactersProps) {
  const ids = props.queryKey.slice(1) as number[];

  return fetchHelper<Character[]>("/api/characters/liked", [
    ...ids.map((id) => ({ key: "id", value: id.toString() })),
  ]);
}

export function LikedCharactersList() {
  const { query } = useCharactersList();

  const session = useSession();

  const storedLikedCharacters = usePersistentState<number[]>(
    `liked-characters-${session.data!.user!.email}`,
    []
  );

  const { data } = useQuery(
    ["characters/liked", ...storedLikedCharacters.value!],
    fetchLikedCharacters
  );

  const filteredCharacters = useMemo(() => {
    const characters = data || [];

    return query
      ? characters.filter((character) => character.name.toLowerCase().includes(query.toLowerCase()))
      : characters;
  }, [data, query]);

  const Components: Components = useMemo(
    () => ({
      // eslint-disable-next-line react/display-name
      List: forwardRef(({ style, children }, listRef) => (
        <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
          {children}
        </List>
      )),
      item: VirtualListItem,
    }),
    []
  );

  return (
    <Virtuoso
      data={filteredCharacters}
      components={Components}
      itemContent={(_, character) => <CharacterListItem key={character.id} character={character} />}
      useWindowScroll
    />
  );
}
