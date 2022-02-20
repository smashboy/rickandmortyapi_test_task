import { forwardRef, useMemo } from "react";
import { Components, Virtuoso } from "react-virtuoso";
import { List } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import type { Character, Info } from "rickmortyapi/dist/interfaces";
import { VirtualListItem } from "core/components/VirtualListItem";
import { fetchHelper } from "utils/client";
import { CharacterListItem } from "./ListItem";
import { useCharactersList } from "./Context";
import { LoadingButton } from "core/components/LoadingButton";

interface FetchCharactersPaginatedProps {
  pageParam?: number;
  queryKey: readonly unknown[];
}

function fetchCharactersPaginated(props: FetchCharactersPaginatedProps) {
  return fetchHelper<Info<Character[]>>("/api/characters/paginated", [
    { key: "page", value: props?.pageParam?.toString() || "1" },
    { key: "filter", value: (props.queryKey[1] as string) || undefined },
  ]);
}

export function AllCharactersList() {
  const { debouncedQuery } = useCharactersList();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    Info<Character[]>
  >(["characters/paginated", debouncedQuery], fetchCharactersPaginated, {
    getNextPageParam: (lastPage) => {
      if (lastPage.info?.next) {
        const nextPage = lastPage.info.next.split("page=")[1];
        return parseInt(nextPage);
      }
    },
  });

  const characters = useMemo(
    () => data?.pages.map((page) => page.results || []).flat() || [],
    [data]
  );

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
