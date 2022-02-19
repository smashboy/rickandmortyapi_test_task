import { useSession } from "core/hooks/useSession";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import type { Character, Info } from "rickmortyapi/dist/interfaces";
import { fetchHelper } from "utils/client";

type ListType = "paginated" | "liked";

interface CharactersListProviderProps {
  children: React.ReactNode;
}

interface CharactersListContext {
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  selectedTab: ListType;
  onTabSelection: (event: React.SyntheticEvent, newTab: ListType) => void;
  characters: Character[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const Context = createContext<CharactersListContext | null>(null);

interface FetchCharactersPaginatedProps {
  pageParam?: number;
}

function fetchCharactersPaginated(props: FetchCharactersPaginatedProps) {
  return fetchHelper<Info<Character[]>>("/api/characters/paginated", [
    { key: "page", value: props?.pageParam?.toString() || "1" },
  ]);
}

export function CharactersListProvider(props: CharactersListProviderProps) {
  const { children } = props;

  const session = useSession();

  const [selectedTab, setSelectedTab] = useState<ListType>("paginated");
  const [query, setQuery] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    Info<Character[]>
  >("characters/paginated", fetchCharactersPaginated, {
    getNextPageParam: (lastPage) => {
      if (lastPage.info?.next) {
        const nextPage = lastPage.info.next.split("page=")[1];
        return parseInt(nextPage);
      }
    },

    enabled: selectedTab === "paginated",
  });

  useEffect(() => {
    if (!session.data?.user && selectedTab === "liked") setSelectedTab("paginated");
  }, [session]);

  const characters = useMemo(
    () =>
      selectedTab === "paginated" ? data?.pages.map((page) => page.results || []).flat() || [] : [],
    [data, selectedTab]
  );

  const handleSearchInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value),
    []
  );

  const handleSetSelectedTab = useCallback(
    (_: React.SyntheticEvent, newTab: ListType) => setSelectedTab(newTab),
    []
  );

  return (
    <Context.Provider
      value={{
        query,
        onSearchInput: handleSearchInput,
        selectedTab,
        onTabSelection: handleSetSelectedTab,
        characters,
        fetchNextPage,
        hasNextPage: Boolean(hasNextPage),
        isFetchingNextPage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCharactersList() {
  const context = useContext(Context);

  if (!context) throw new Error("useCharactersList must be used within CharactersListProvider");

  return context;
}
