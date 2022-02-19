import { Suspense } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useIsSmallDevice } from "core/hooks/useIsSmallDevice";
import { getProviders, signIn } from "next-auth/react";
import { useQuery } from "react-query";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedinIcon from "@mui/icons-material/LinkedIn";
import { LoadingAnimation } from "./LoadingAnimation";
import { Button } from "./Button";
import { useSession } from "core/hooks/useSession";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

const providerColorPicker = (id: string) => {
  switch (id) {
    case "facebook":
      return "#4267B2";
    case "linkedin":
      return "#2867B2";
    default:
      return;
  }
};

interface ProviderIconProps {
  id: string;
}

const ProviderIcon = (props: ProviderIconProps) => {
  switch (props.id) {
    case "facebook":
      return <FacebookIcon sx={{ color: "white" }} />;
    case "linkedin":
      return <LinkedinIcon sx={{ color: "white" }} />;
    default:
      return null;
  }
};

interface ProvidersListProps {
  onSignIn: () => void;
}

function ProvidersList(props: ProvidersListProps) {
  const { onSignIn } = props;

  const { data } = useQuery("providers", getProviders);
  const session = useSession();

  const handleSignIn = (id: string) => async () => {
    await signIn(id, { redirect: false });
    session.refetch();
    onSignIn();
  };

  return (
    <Grid container spacing={2}>
      {data &&
        Object.values(data).map((provider) => (
          <Grid container key={provider.id} item xs={12} justifyContent="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: providerColorPicker(provider.id) }}
              onClick={handleSignIn(provider.id)}
              endIcon={<ProviderIcon id={provider.id} />}
            >
              Sign in with {provider.name}
            </Button>
          </Grid>
        ))}
    </Grid>
  );
}

export function AuthDialog(props: AuthDialogProps) {
  const { open, onClose } = props;

  const isSM = useIsSmallDevice();

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isSM} fullWidth maxWidth="md">
      <DialogTitle>Sign in</DialogTitle>
      <DialogContent>
        <Suspense fallback={<LoadingAnimation containerStyles={{ minHeight: "400px" }} />}>
          <ProvidersList onSignIn={onClose} />
        </Suspense>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
