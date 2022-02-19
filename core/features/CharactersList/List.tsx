import { forwardRef, useMemo } from "react";
import { Components, Virtuoso } from "react-virtuoso";
import { List } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { VirtualListItem } from "core/components/VirtualListItem";
import { CharacterListItem } from "./ListItem";
import { useCharactersList } from "./Context";

export function CharactersList() {
  const { characters, fetchNextPage, hasNextPage, isFetchingNextPage } = useCharactersList();

  const Components: Components = useMemo(
    () => ({
      // eslint-disable-next-line react/display-name
      List: forwardRef(({ style, children }, listRef) => (
        <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
          {children}
        </List>
      )),
      item: VirtualListItem,
      Footer: () =>
        hasNextPage ? (
          <LoadingButton
            onClick={() => fetchNextPage()}
            variant="outlined"
            loading={isFetchingNextPage}
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Load More
          </LoadingButton>
        ) : null,
    }),
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return (
    <Virtuoso
      data={characters}
      components={Components}
      itemContent={(_, character) => <CharacterListItem key={character.id} character={character} />}
      useWindowScroll
    />
  );
}
