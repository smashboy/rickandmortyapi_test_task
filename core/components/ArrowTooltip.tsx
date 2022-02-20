import { Tooltip, TooltipProps } from "@mui/material";

export function ArrowTooltip({ children, ...otherProps }: TooltipProps) {
  return (
    <Tooltip arrow {...otherProps}>
      {children}
    </Tooltip>
  );
}
