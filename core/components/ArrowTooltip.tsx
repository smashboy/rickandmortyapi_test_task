import { Tooltip } from "@mui/material";
import type { TooltipProps } from "@mui/material";

export function ArrowTooltip({ children, ...otherProps }: TooltipProps) {
  return (
    <Tooltip arrow {...otherProps}>
      {children}
    </Tooltip>
  );
}
