import { Container, Grid } from "@mui/material";
import { Suspense } from "react";
import { CharactersListProvider } from "./Context";
import { CharactersListHeader } from "./Header";
import { CharactersListSelector } from "./ListSelector";
import { CharactersListSkeleton } from "./Skeleton";

export function CharactersList() {
  return (
    <Suspense fallback={null}>
      <CharactersListProvider>
        <Container maxWidth="md" disableGutters>
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Suspense fallback={null}>
                <CharactersListHeader />
              </Suspense>
            </Grid>
            <Grid item xs={12}>
              <Suspense fallback={<CharactersListSkeleton />}>
                <CharactersListSelector />
              </Suspense>
            </Grid>
          </Grid>
        </Container>
      </CharactersListProvider>
    </Suspense>
  );
}
