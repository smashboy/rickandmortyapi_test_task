import { Suspense, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Container,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import { AuthDialog } from "core/features/AuthDialog";
import { Button } from "core/components/Button";
import { useSession } from "core/hooks/useSession";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { CharactersSearch } from "core/features/CharactersSearch";

interface MainLayoutProps {
  children: React.ReactNode;
}

function UserProfile() {
  const session = useSession();

  const [openAuth, setOpenAuth] = useState(false);
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);

  const handleOpenAuth = () => setOpenAuth(true);
  const handleCloseAuth = () => setOpenAuth(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) =>
    setMenuEl(event.currentTarget);
  const handleCloseMenu = () => setMenuEl(null);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    session.refetch();
    handleCloseMenu();
  };

  return (
    <Box sx={{ paddingLeft: 2 }}>
      {session.data?.user ? (
        <Avatar
          src={session.data.user.image || undefined}
          alt={session.data.user.name || "Profile Avatar"}
          sx={{ cursor: "pointer" }}
          onClick={handleOpenMenu}
        />
      ) : (
        <Button color="inherit" onClick={handleOpenAuth}>
          Login
        </Button>
      )}
      <AuthDialog open={openAuth} onClose={handleCloseAuth} />
      <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={handleCloseMenu} disableAutoFocusItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Exit" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Typography
                variant="h6"
                color="text.primary"
                component="a"
                sx={{ textDecoration: "none" }}
              >
                Rick and Morty
              </Typography>
            </Link>
          </Box>
          <CharactersSearch />
          <Suspense fallback={<Skeleton variant="circular" width={40} height={40} />}>
            <UserProfile />
          </Suspense>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 3, paddingBottom: 5 }}>{children}</Container>
    </>
  );
}
