import { CharacterPageProps } from "pages/character/[id]";
import { createContext, useState, useContext } from "react";

interface CharacterProfileContext extends CharacterPageProps {}

const Context = createContext<CharacterProfileContext | null>(null);

interface CharacterProfileProvider extends CharacterPageProps {
  children: React.ReactNode;
}

export function CharacterProfileProvider(props: CharacterProfileProvider) {
  const { children, character: initialCharacter } = props;

  const [character, setCharacter] = useState(initialCharacter);

  return <Context.Provider value={{ character }}>{children}</Context.Provider>;
}

export function useCharacterProfile() {
  const context = useContext(Context);

  if (!context) throw new Error("useCharacterProfile must be used within CharacterProfileProvider");

  return context;
}
