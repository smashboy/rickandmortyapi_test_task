import { useMediaQuery, useTheme } from "@mui/material";

export function useIsSmallDevice() {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("sm"));

  return isSM;
}
