import Link from "next/link";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import type { Character } from "rickmortyapi/dist/interfaces";

interface CharacterListItemProps {
  character: Character;
}

export function CharacterListItem(props: CharacterListItemProps) {
  const { character } = props;

  return (
    <Link href={`/character/${character.id}`} passHref>
      <ListItem component="a" button>
        <ListItemAvatar>
          <Avatar src={character.image} alt={character.name} sx={{ width: 45, height: 45 }} />
        </ListItemAvatar>
        <ListItemText primary={character.name} secondary={character.status} />
      </ListItem>
    </Link>
  );
}
