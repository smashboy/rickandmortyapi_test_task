import { Button as MUIButton } from "@mui/material";
import type { ButtonProps as MUIButtonProps } from "@mui/material";

interface ButtonProps extends Omit<MUIButtonProps, "disableElevation" | "disableRipple"> {
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <MUIButton {...otherProps} disableRipple disableElevation>
      {children}
    </MUIButton>
  );
}
