import type { CharacterPageProps } from "pages/character/[id]";
import { createContext, useState, useContext, useCallback } from "react";

interface CharacterProfileContext extends CharacterPageProps {
  changeAvatar: (newAvatar: File) => void;
}

const Context = createContext<CharacterProfileContext | null>(null);

interface CharacterProfileProvider extends CharacterPageProps {
  children: React.ReactNode;
}

export function CharacterProfileProvider(props: CharacterProfileProvider) {
  const { children, character: initialCharacter } = props;

  const [character, setCharacter] = useState(initialCharacter);

  const handleChangeAvatar = useCallback(
    (newAvatar: File) =>
      setCharacter((prevState) => ({ ...prevState, image: URL.createObjectURL(newAvatar) })),
    []
  );

  return (
    <Context.Provider value={{ character, changeAvatar: handleChangeAvatar }}>
      {children}
    </Context.Provider>
  );
}

export function useCharacterProfile() {
  const context = useContext(Context);

  if (!context) throw new Error("useCharacterProfile must be used within CharacterProfileProvider");

  return context;
}
