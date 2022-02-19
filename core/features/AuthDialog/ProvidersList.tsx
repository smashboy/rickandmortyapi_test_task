import { Grid } from "@mui/material";
import { Button } from "core/components/Button";
import { useSession } from "core/hooks/useSession";
import { getProviders, signIn } from "next-auth/react";
import { useQuery } from "react-query";
import { providerColorPicker, ProviderIcon } from "./helpers";

interface ProvidersListProps {
  onSignIn: () => void;
}

export function ProvidersList(props: ProvidersListProps) {
  const { onSignIn } = props;

  const { data } = useQuery("providers", getProviders);
  const session = useSession();

  const handleSignIn = (id: string) => async () => {
    await signIn(id, { redirect: false });
    session.refetch();
    onSignIn();
  };

  return (
    <Grid container rowSpacing={2}>
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
