import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedinIcon from "@mui/icons-material/LinkedIn";

export function providerColorPicker(id: string) {
  switch (id) {
    case "facebook":
      return "#4267B2";
    case "linkedin":
      return "#2867B2";
    default:
      return;
  }
}

interface ProviderIconProps {
  id: string;
}

export function ProviderIcon(props: ProviderIconProps) {
  switch (props.id) {
    case "facebook":
      return <FacebookIcon sx={{ color: "white" }} />;
    case "linkedin":
      return <LinkedinIcon sx={{ color: "white" }} />;
    default:
      return null;
  }
}
