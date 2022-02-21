import { useCallback, useMemo, useState, createContext, useContext } from "react";
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "use-debounce";
import type { Character, Info } from "rickmortyapi/dist/interfaces";
import { fetchCharactersPaginated } from "../CharactersList/AllCharactersList";

interface CharacterSearchContext {
  characters: Character[];
  fetchNext: () => void;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  query: string;
  onSearch: (_: React.SyntheticEvent<Element, Event>, query: string) => void;
}

interface CharacterSearchProviderProps {
  children: React.ReactNode;
}

const Context = createContext<CharacterSearchContext | null>(null);

export function CharacterSearchProvider(props: CharacterSearchProviderProps) {
  const { children } = props;

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery<
    Info<Character[]>
  >(["characters/search", debouncedQuery], fetchCharactersPaginated, {
    getNextPageParam: (lastPage) => {
      if (lastPage.info?.next) {
        const nextPage = lastPage.info.next.split("page=")[1];
        return parseInt(nextPage);
      }
    },
    suspense: false,
    enabled: Boolean(debouncedQuery),
  });

  const characters = useMemo(
    () => data?.pages.map((page) => page.results || []).flat() || [],
    [data]
  );

  const handleSearchInput = useCallback(
    (_: React.SyntheticEvent<Element, Event>, query: string) => setQuery(query),
    []
  );

  const fetchNext = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  return (
    <Context.Provider
      value={{
        characters,
        fetchNext,
        isFetchingNextPage,
        isFetching,
        query,
        onSearch: handleSearchInput,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCharacterSearch() {
  const context = useContext(Context);

  if (!context) throw new Error("useCharacterSearch must be used within CharacterSearchProvider");

  return context;
}
