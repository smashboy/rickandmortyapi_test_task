import { Box } from "@mui/material";

interface VirtualListItemProps {
  children?: React.ReactNode;
}

export function VirtualListItem(props: VirtualListItemProps) {
  const { children, ...otherProps } = props;

  return (
    <Box {...otherProps} style={{ margin: 0, position: "relative" }}>
      {children}
    </Box>
  );
}
