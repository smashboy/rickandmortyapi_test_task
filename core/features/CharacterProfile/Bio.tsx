import AddCharacterPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import LikeIcon from "@mui/icons-material/Favorite";
import { Avatar, Grid, IconButton, Paper, Stack, Typography, Divider } from "@mui/material";
import { ArrowTooltip } from "core/components/ArrowTooltip";
import { formatUserFriendlyDate } from "utils/client";
import { useCharacterProfile } from "./Context";
import { DescriptionItem } from "./DescriptionItem";

export function CharacterProfileBio() {
  const { character } = useCharacterProfile();

  return (
    <Paper
      sx={{ padding: 2, position: "sticky", overflow: "hidden", height: "fit-content", top: 90 }}
    >
      <Grid container rowSpacing={1}>
        <Grid container item xs={12} justifyContent="center">
          <Avatar src={character.image} alt={character.name} sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Typography variant="h5">{character.name}</Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Stack direction="row" spacing={1}>
            <ArrowTooltip title="Change profile photo">
              <IconButton>
                <AddCharacterPhotoIcon />
              </IconButton>
            </ArrowTooltip>
            <ArrowTooltip title="Like characted">
              <IconButton>
                <LikeIcon />
              </IconButton>
            </ArrowTooltip>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack divider={<Divider flexItem />} spacing={1}>
            <DescriptionItem title="Species" description={character.species} />
            <DescriptionItem title="Gender" description={character.gender} />
            <DescriptionItem title="Location" description={character.location.name} />
            <DescriptionItem title="Status" description={character.status} />
            <DescriptionItem
              title="Created"
              description={formatUserFriendlyDate(new Date(character.created))}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
