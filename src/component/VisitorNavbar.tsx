"use client";

import { ReactNode } from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import FAQButton from "./FAQButton";
import { useRouter } from "next/navigation";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  function toHome() {
    router.push("/home");
  }
  function toLogin() {
    router.push("/auth/login");
  }
  function toRegister() {
    router.push("/auth/register");
  }
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: "white", color: "text.primary", cursor: "pointer" }}
      >
        <Toolbar>
          <Typography
            onClick={toHome}
            variant="h6"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 800,
            }}
          >
            Fund4U
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button onClick={toHome} color="inherit">
            หน้าแรก
          </Button>
          <Button onClick={toLogin} color="inherit">
            เข้าสู่ระบบ
          </Button>
          <Button onClick={toRegister} color="inherit">
            สมัครสมาชิก
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>{children}</Container>

      <FAQButton />
    </Box>
  );
}
