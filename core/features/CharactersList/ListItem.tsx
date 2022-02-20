import Link from "next/link";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import type { Character } from "rickmortyapi/dist/interfaces";
import { CharacterAvatar } from "core/components/CharacterAvatar";

interface CharacterListItemProps {
  character: Character;
}

export function CharacterListItem(props: CharacterListItemProps) {
  const { character } = props;

  return (
    <Link href={`/character/${character.id}`} passHref>
      <ListItem component="a" button>
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
    </Link>
  );
}
