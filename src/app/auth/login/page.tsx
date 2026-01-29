"use client";

import { Box, Card, Typography, Button, TextField, Stack, alpha } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { users } from "@/data/user";
import { COLORS } from "@/constants/colors";

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
      router.push("/sme/verification");
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
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: 2,
                "&.Mui-focused fieldset": { borderColor: COLORS.PURPLE }
              },
              "& .MuiInputLabel-root.Mui-focused": { color: COLORS.PURPLE }
            }}
          />
          <TextField
            label="รหัสผ่าน (Password)"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ 
              "& .MuiOutlinedInput-root": { 
                borderRadius: 2,
                "&.Mui-focused fieldset": { borderColor: COLORS.PURPLE }
              },
              "& .MuiInputLabel-root.Mui-focused": { color: COLORS.PURPLE }
            }}
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
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: 800,
                textTransform: "none",
                borderRadius: 2,
                background: `linear-gradient(90deg, ${COLORS.PURPLE} 0%, ${COLORS.GOLD} 100%)`,
                color: "white",
                boxShadow: `0 4px 12px ${alpha(COLORS.PURPLE, 0.3)}`,
                "&:hover": {
                  boxShadow: `0 6px 16px ${alpha(COLORS.PURPLE, 0.4)}`,
                },
              }}
              onClick={onClickLogin}
            >
              เข้าสู่ระบบ
            </Button>

            {/* Quick Login Shortcuts */}
            <Box sx={{ width: "100%", mt: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1, display: "block", textAlign: "center", fontWeight: 600 }}
              >
                Quick Login (For Testing)
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setEmail("sme@fund4u.com");
                    setPassword("sme");
                  }}
                  sx={{ 
                    borderRadius: 2, 
                    textTransform: "none", 
                    fontWeight: 700,
                    borderColor: COLORS.PURPLE, 
                    color: COLORS.PURPLE,
                    "&:hover": { 
                      borderColor: alpha(COLORS.PURPLE, 0.8), 
                      bgcolor: alpha(COLORS.PURPLE, 0.04) 
                    }
                  }}
                >
                  SME
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setEmail("investor@fund4u.com");
                    setPassword("investor");
                  }}
                  sx={{ 
                    borderRadius: 2, 
                    textTransform: "none", 
                    fontWeight: 700,
                    borderColor: COLORS.GOLD, 
                    color: COLORS.GOLD,
                    "&:hover": { 
                      borderColor: alpha(COLORS.GOLD, 0.8), 
                      bgcolor: alpha(COLORS.GOLD, 0.04) 
                    }
                  }}
                >
                  Investor
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
                gap: 0.5
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                ยังไม่มีบัญชี?
              </Typography>
              <Button
                onClick={() => router.push("/auth/register")}
                sx={{
                  p: 0,
                  minWidth: "auto",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  color: COLORS.PURPLE,
                  "&:hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                สมัครสมาชิก
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
