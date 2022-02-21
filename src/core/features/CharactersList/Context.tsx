import { useSession } from "core/hooks/useSession";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type ListType = "paginated" | "liked";

interface CharactersListProviderProps {
  children: React.ReactNode;
}

interface CharactersListContext {
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  selectedTab: ListType;
  onTabSelection: (event: React.SyntheticEvent, newTab: ListType) => void;
  debouncedQuery: string;
}

const Context = createContext<CharactersListContext | null>(null);

export function CharactersListProvider(props: CharactersListProviderProps) {
  const { children } = props;

  const session = useSession();

  const [selectedTab, setSelectedTab] = useState<ListType>("paginated");
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  useEffect(() => {
    if (!session.data?.user && selectedTab === "liked") setSelectedTab("paginated");
  }, [session]);

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
        debouncedQuery,
        onSearchInput: handleSearchInput,
        selectedTab,
        onTabSelection: handleSetSelectedTab,
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
