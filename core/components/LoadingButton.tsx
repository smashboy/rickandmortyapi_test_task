import { LoadingButton as MUILoadingButton } from "@mui/lab";
import type { LoadingButtonProps as MUILoadingButtonProps } from "@mui/lab";

interface LoadingButtonProps
  extends Omit<MUILoadingButtonProps, "disableElevation" | "disableRipple"> {
  children?: React.ReactNode;
}

export function LoadingButton(props: LoadingButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <MUILoadingButton {...otherProps} disableRipple disableElevation>
      {children}
    </MUILoadingButton>
  );
}
