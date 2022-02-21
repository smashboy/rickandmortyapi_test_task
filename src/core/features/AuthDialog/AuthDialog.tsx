import { Suspense } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useIsSmallDevice } from "core/hooks/useIsSmallDevice";
import { ProvidersList } from "./ProvidersList";
import { LoadingAnimation } from "core/components/LoadingAnimation";
import { Button } from "core/components/Button";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
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
