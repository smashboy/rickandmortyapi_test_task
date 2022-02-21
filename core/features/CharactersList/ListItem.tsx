import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import type { Character } from "rickmortyapi/dist/interfaces";
import { CharacterAvatar } from "core/components/CharacterAvatar";

export interface CharacterListItemProps {
  character: Character;
  autoCompleteProps?: any;
}

export function CharacterListItem(props: CharacterListItemProps) {
  const { character, autoCompleteProps } = props;

  return (
    <ListItem href={`/character/${character.id}`} {...autoCompleteProps} component="a" button>
      <ListItemAvatar>
        <CharacterAvatar
          url={character.image}
          name={character.name}
          id={character.id}
          sx={{ width: 45, height: 45 }}
        />
      </ListItemAvatar>
      <ListItemText primary={character.name} secondary={character.status} />
    </ListItem>
  );
}
