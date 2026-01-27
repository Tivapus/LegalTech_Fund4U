"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  alpha,
  useTheme,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MenuIcon from "@mui/icons-material/Menu";

export default function SmeNavbar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "My Campaign", path: "/sme/campaign", icon: <RocketLaunchIcon /> },
  ].filter((item) => {
    if (pathname === "/sme/verification" && item.label === "My Campaign") {
      return false;
    }
    return true;
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.divider, 0.1),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              onClick={() => router.push("/sme")}
              sx={{
                fontWeight: 900,
                cursor: "pointer",
                mr: 4,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
              }}
            >
              Fund4U{" "}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  px: 1,
                  borderRadius: 1,
                }}
              >
                SME
              </Typography>
            </Typography>

            {/* Desktop Nav Links */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/sme" && pathname.startsWith(item.path));
                return (
                  <Button
                    key={item.label}
                    onClick={() => router.push(item.path)}
                    startIcon={item.icon}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: isActive ? 800 : 500,
                      color: isActive ? "primary.main" : "text.secondary",
                      bgcolor: isActive
                        ? alpha(theme.palette.primary.main, 0.05)
                        : "transparent",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {/* Right Side */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => router.push("/home")}
                startIcon={<LogoutIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 700,
                  borderColor: alpha(theme.palette.divider, 0.2),
                  display: { xs: "none", md: "flex" },
                }}
              >
                Logout
              </Button>

              {/* Mobile Menu Icon */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              my: 2,
              fontWeight: 900,
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Fund4U{" "}
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                px: 1,
                borderRadius: 1,
              }}
            >
              SME
            </Typography>
          </Typography>
          <List>
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/sme" && pathname.startsWith(item.path));
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      router.push(item.path);
                      setMobileOpen(false);
                    }}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      bgcolor: isActive
                        ? alpha(theme.palette.primary.main, 0.05)
                        : "transparent",
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? "primary.main" : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 800 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem
              disablePadding
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <ListItemButton
                onClick={() => router.push("/auth/login")}
                sx={{ borderRadius: 2, color: "error.main" }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main">
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
