import { AllCharactersList } from "./AllCharactersList";
import { useCharactersList } from "./Context";
import { LikedCharactersList } from "./LikedCharactersList";

export function CharactersListSelector() {
  const { selectedTab } = useCharactersList();

  return <>{selectedTab === "paginated" ? <AllCharactersList /> : <LikedCharactersList />}</>;
}
