"use client";

import { Box, Card, Typography, Button, TextField, Stack } from "@mui/material";
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
                "&.Mui-focused fieldset": { borderColor: "#a44ccd" }
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#a44ccd" }
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
                "&.Mui-focused fieldset": { borderColor: "#a44ccd" }
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#a44ccd" }
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
                background: "linear-gradient(90deg, #a44ccd 0%, #fcac3f 100%)",
                color: "white",
                boxShadow: "0 4px 12px rgba(164, 76, 205, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(164, 76, 205, 0.4)",
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
                    borderColor: "#a44ccd", 
                    color: "#a44ccd",
                    "&:hover": { 
                      borderColor: "#8e3eb3", 
                      bgcolor: "rgba(164, 76, 205, 0.04)" 
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
                    borderColor: "#fcac3f", 
                    color: "#fcac3f",
                    "&:hover": { 
                      borderColor: "#e59b35", 
                      bgcolor: "rgba(252, 172, 63, 0.04)" 
                    }
                  }}
                >
                  Investor
                </Button>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, mt: 2 }}
            >
              ยังไม่มีบัญชี?{" "}
              <Button
                onClick={() => router.push("/auth/register")}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  color: "#a44ccd",
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
