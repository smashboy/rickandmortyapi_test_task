import { Box, Grid, Paper, Tab, Tabs, TextField } from "@mui/material";
import { useSession } from "core/hooks/useSession";
import { useCharactersList } from "./Context";

export function CharactersListHeader() {
  const session = useSession();

  const { query, onSearchInput, selectedTab, onTabSelection } = useCharactersList();

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 1 }}>
          <TextField
            label="Search..."
            variant="outlined"
            size="small"
            value={query}
            onChange={onSearchInput}
            fullWidth
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {session.data?.user && (
          <Tabs
            value={selectedTab}
            onChange={onTabSelection}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="All" value="paginated" />
            <Tab label="Liked" value="liked" />
          </Tabs>
        )}
      </Grid>
    </Grid>
  );
}
