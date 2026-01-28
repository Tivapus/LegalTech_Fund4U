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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FAQButton from "./FAQButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

type VisitorNavbarProps = { children: ReactNode };

export default function VisitorNavbar({ children }: VisitorNavbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const menuItems = [
    { label: "หน้าแรก", onClick: toHome },
    { label: "เข้าสู่ระบบ", onClick: toLogin },
    { label: "สมัครสมาชิก", onClick: toRegister },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "white", color: "text.primary" }}
      >
        <Toolbar>
          <Typography
            onClick={toHome}
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Fund4U
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <Button onClick={toHome} color="inherit">
              หน้าแรก
            </Button>
            <Button onClick={toLogin} color="inherit">
              เข้าสู่ระบบ
            </Button>
            <Button onClick={toRegister} color="inherit">
              สมัครสมาชิก
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 2 }}>
          <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>
            Fund4U
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={item.onClick}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Container maxWidth="xl" sx={{ py: 4 }}>{children}</Container>

      <FAQButton />
    </Box>
  );
}
