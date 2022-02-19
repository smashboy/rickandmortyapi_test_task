import { Box, CircularProgress } from "@mui/material";
import type { BoxProps } from "@mui/material";
import type { PickSingleKeyValue } from "utils/common";

interface LoadingAnimationProps {
  containerStyles: PickSingleKeyValue<BoxProps, "sx">;
}

export function LoadingAnimation(props: LoadingAnimationProps) {
  const { containerStyles } = props;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingY: 10,
        ...containerStyles,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
