import { Suspense } from "react";
import { Container, Grid } from "@mui/material";
import { CharactersList as List } from "./List";
import { CharactersListProvider } from "./Context";
import { CharactersListHeader } from "./Header";

export function CharactersList() {
  return (
    <Suspense fallback={"LOADING..."}>
      <CharactersListProvider>
        <Container maxWidth="md" disableGutters>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <CharactersListHeader />
            </Grid>
            <Grid item xs={12}>
              <List />
            </Grid>
          </Grid>
        </Container>
      </CharactersListProvider>
    </Suspense>
  );
}
