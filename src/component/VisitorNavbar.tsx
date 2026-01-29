"use client";

import { ReactNode } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  alpha,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FAQButton from "./FAQButton";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type VisitorNavbarProps = { children: ReactNode };

export default function VisitorNavbar({ children }: VisitorNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isInvestorPage = pathname.startsWith("/investor");

  function toHome() {
    router.push("/home");
    setMobileOpen(false);
  }
  function toLogin() {
    router.push("/auth/login");
    setMobileOpen(false);
  }
  function toRegister() {
    router.push("/auth/register");
    setMobileOpen(false);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = isInvestorPage 
    ? [
        { label: "หน้าแรก", onClick: toHome, icon: <HomeIcon /> },
      ]
    : [
        { label: "หน้าแรก", onClick: toHome, icon: <HomeIcon /> },
        { label: "เข้าสู่ระบบ", onClick: toLogin, icon: <LoginIcon /> },
        { label: "สมัครสมาชิก", onClick: toRegister, icon: <PersonAddIcon /> },
      ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "white", color: "text.primary" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              onClick={() => router.push(isInvestorPage ? "/investor" : "/home")}
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
              {isInvestorPage && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    px: 1,
                    borderRadius: 1,
                  }}
                >
                  Investor
                </Typography>
              )}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {isInvestorPage ? (
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
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button onClick={toHome} color="inherit">
                    หน้าแรก
                  </Button>
                  <Button onClick={toLogin} color="inherit">
                    เข้าสู่ระบบ
                  </Button>
                  <Button onClick={toRegister} color="inherit">
                    สมัครสมาชิก
                  </Button>
                </>
              )}
            </Box>

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
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
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
            {isInvestorPage && (
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  px: 1,
                  borderRadius: 1,
                }}
              >
                Investor
              </Typography>
            )}
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={item.onClick}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    color: "text.secondary",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {isInvestorPage && (
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
                  onClick={() => router.push("/home")}
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
            )}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ py: 4 }}>{children}</Container>

      <FAQButton />
    </Box>
  );
}
