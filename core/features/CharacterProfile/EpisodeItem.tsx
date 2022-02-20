import { ListItem, ListItemText } from "@mui/material";
import type { Episode } from "rickmortyapi/dist/interfaces";
import { formatUserFriendlyDate } from "utils/client";

interface EpisodeItemProps {
  episode: Episode;
}

export function EpisodeItem(props: EpisodeItemProps) {
  const { episode } = props;

  return (
    <ListItem>
      <ListItemText
        primary={episode.name}
        secondary={formatUserFriendlyDate(new Date(episode.created))}
      />
    </ListItem>
  );
}
