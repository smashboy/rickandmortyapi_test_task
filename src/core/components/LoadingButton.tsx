import { LoadingButton as MUILoadingButton } from "@mui/lab";
import type { LoadingButtonProps as MUILoadingButtonProps } from "@mui/lab";

interface LoadingButtonProps extends Omit<MUILoadingButtonProps, "disableElevation"> {
  children?: React.ReactNode;
}

export function LoadingButton(props: LoadingButtonProps) {
  const { children, ...otherProps } = props;

  return (
    <MUILoadingButton {...otherProps} disableElevation>
      {children}
    </MUILoadingButton>
  );
}
