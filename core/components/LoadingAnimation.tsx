import { Box, CircularProgress } from "@mui/material";
import type { BoxProps, CircularProgressProps } from "@mui/material";
import type { PickSingleKeyValue } from "utils/common";

interface LoadingAnimationProps {
  containerStyles?: PickSingleKeyValue<BoxProps, "sx">;
  propgressProps?: CircularProgressProps;
}

export function LoadingAnimation(props: LoadingAnimationProps) {
  const { containerStyles, propgressProps } = props;

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
      <CircularProgress color="primary" {...propgressProps} />
    </Box>
  );
}
