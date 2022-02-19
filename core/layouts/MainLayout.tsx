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
} from "@mui/material";
import { AuthDialog } from "core/features/AuthDialog";
import { Button } from "core/components/Button";
import { useSession } from "core/hooks/useSession";
import { signOut } from "next-auth/react";

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
    <>
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
    </>
  );
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rick and Morty
          </Typography>
          <Suspense fallback={<Skeleton variant="circular" width={40} height={40} />}>
            <UserProfile />
          </Suspense>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
}
