import { forwardRef, useMemo } from "react";
import { Components, Virtuoso } from "react-virtuoso";
import { Grid, Typography, List } from "@mui/material";
import { useCharacterProfile } from "./Context";
import { VirtualListItem } from "core/components/VirtualListItem";
import { EpisodeItem } from "./EpisodeItem";

export function CharacterEpisodesList() {
  const { character } = useCharacterProfile();

  const Components: Components = useMemo(
    () => ({
      // eslint-disable-next-line react/display-name
      List: forwardRef(({ style, children }, listRef) => (
        <List style={{ padding: 0, ...style, margin: 0 }} component="div" ref={listRef}>
          {children}
        </List>
      )),
      item: VirtualListItem,
    }),
    []
  );

  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Episodes:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Virtuoso
          data={character.episodes}
          components={Components}
          itemContent={(_, episode) => <EpisodeItem key={episode.id} episode={episode} />}
          useWindowScroll
        />
      </Grid>
    </Grid>
  );
}
