"use client";

import { Box, Card, Typography, Button, TextField } from "@mui/material";
import Layout from "@/component/VisitorNavbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { users } from "@/data/user";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onClickLogin() {
    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      alert("Invalid email or password");
      return;
    }
    if (user.role === "sme") {
      router.push("/sme");
    } else if (user.role === "investor") {
      router.push("/investor");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, md: 8 },
      }}
    >
      <Card
        elevation={0}
        sx={{
          p: { xs: 3, sm: 6 },
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 1, textAlign: "center" }}
          color="black"
        >
          เข้าสู่ระบบ
        </Typography>
        <Typography
          color="text.secondary"
          mb={4}
          textAlign="center"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ Fund4U
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            width: "100%",
          }}
        >
          <TextField
            label="อีเมล (Email)"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <TextField
            label="รหัสผ่าน (Password)"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 800,
                textTransform: "none",
                borderRadius: 2,
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
              onClick={onClickLogin}
            >
              เข้าสู่ระบบ
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              ยังไม่มีบัญชี?{" "}
              <Button
                onClick={() => router.push("/auth/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  color: "black",
                  "&:hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                สมัครสมาชิก
              </Button>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
