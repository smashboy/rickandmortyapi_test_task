import { Grid, Paper, Stack, Typography, Divider } from "@mui/material";
import { CharacterAvatar } from "core/components/CharacterAvatar";
import { Suspense } from "react";
import { formatUserFriendlyDate } from "utils/client";
import { AvatarUploader } from "./AvatarUploader";
import { useCharacterProfile } from "./Context";
import { DescriptionItem } from "./DescriptionItem";
import { LikeCharacterButton } from "./LikeButton";

export function CharacterProfileBio() {
  const { character } = useCharacterProfile();

  return (
    <Paper
      sx={{ padding: 2, position: "sticky", overflow: "hidden", height: "fit-content", top: 90 }}
    >
      <Grid container rowSpacing={1}>
        <Grid container item xs={12} justifyContent="center">
          <CharacterAvatar
            url={character.image}
            name={character.name}
            id={character.id}
            sx={{ width: 120, height: 120 }}
            isProfile
          />
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Typography variant="h5">{character.name}</Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center">
          <Stack direction="row" spacing={1}>
            <AvatarUploader />
            <Suspense fallback={null}>
              <LikeCharacterButton />
            </Suspense>
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
