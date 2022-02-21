import { Grid, Typography } from "@mui/material";
import { CharactersList } from "core/features/CharactersList";

export default function Home() {
  return (
    <Grid container rowSpacing={2}>
      <Grid container item xs={12} justifyContent="center">
        <Typography variant="h4">Characters</Typography>
      </Grid>
      <Grid item xs={12}>
        <CharactersList />
      </Grid>
    </Grid>
  );
}
