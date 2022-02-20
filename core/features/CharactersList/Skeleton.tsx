import { Grid, Skeleton } from "@mui/material";

const items = new Array(20).fill(null);

function CharactersListSkeletonItem() {
  return (
    <Grid container item xs={12}>
      <Grid container item xs={2} md={1} justifyContent="center" alignItems="center">
        <Skeleton variant="circular" width={45} height={45} />
      </Grid>
      <Grid item xs={10} md={11}>
        <Skeleton width={240} />
        <Skeleton width={90} />
      </Grid>
    </Grid>
  );
}

export function CharactersListSkeleton() {
  return (
    <Grid container rowSpacing={2}>
      {items.map((_, index) => (
        <CharactersListSkeletonItem key={`characters-list-skeleton-item-${index}`} />
      ))}
    </Grid>
  );
}
