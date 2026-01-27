"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const gradientText = {
  background: "linear-gradient(90deg, #1e88e5 0%, #8e24aa 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const roleCardStyle = {
  cursor: "pointer",
  border: "1px solid #e5e7eb",
  borderRadius: 4,
  padding: 4,
  width: { xs: "100%", sm: "50%" },
  textAlign: "center",
  backgroundColor: "#fff",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupType = searchParams.get("signup");

  const isSME = signupType === "sme";
  const isInvestor = signupType === "investor";

  const [form, setForm] = React.useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderForm = () => (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 4,
        backgroundColor: "#fff",
        p: 4,
        borderRadius: 4,
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <TextField fullWidth label="อีเมล" name="email" margin="normal" onChange={handleChange} />

      <TextField
        fullWidth
        label="เบอร์มือถือ"
        name="phone"
        margin="normal"
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🇹🇭 +66</InputAdornment>,
        }}
      />

      <TextField
        fullWidth
        label="รหัสผ่าน"
        type={showPassword ? "text" : "password"}
        name="password"
        margin="normal"
        onChange={handleChange}
        helperText="ขั้นต่ำ 8 ตัวอักษร, ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว และตัวเลขอย่างน้อย 1 ตัว"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="ยืนยันรหัสผ่าน"
        type="password"
        name="confirmPassword"
        margin="normal"
        onChange={handleChange}
      />

      <Button
        fullWidth
        sx={{
          mt: 3,
          py: 1.2,
          fontWeight: 700,
          color: "white",
          borderRadius: 2,
          background: "linear-gradient(90deg, #1e88e5 0%, #8e24aa 100%)",
        }}
        onClick={() => router.push("/auth/login")}
      >
        สมัครสมาชิก
      </Button>

      <Button fullWidth sx={{ mt: 2, color: "#555" }} onClick={() => router.push("/auth/register")}>
        กลับหน้าเลือกประเภท
      </Button>
    </Box>
  );

  if (isSME || isInvestor) {
    return (
      <Box sx={{ py: 8, px: 2, backgroundColor: "#f9fafb" }}>
        <Typography variant="h4" fontWeight={800} textAlign="center" sx={gradientText}>
          {isSME ? "Register as SME" : "Register as Investor"}
        </Typography>

        <Typography textAlign="center" color="text.secondary" mt={1}>
          กรุณากรอกข้อมูลเพื่อสมัครสมาชิก
        </Typography>

        {renderForm()}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#f9fafb",
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight={900} mb={5} textAlign="center" sx={gradientText}>
        Revolutionizing SME Capital with LegalTech
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ width: "100%", maxWidth: 800 }}>
        <Box sx={roleCardStyle} onClick={() => router.push("?signup=sme")}>
          <StorefrontIcon sx={{ fontSize: 48, mb: 2, color: "#1e88e5" }} />
          <Typography fontWeight={800} color="#1e88e5">
            Register as SME
          </Typography>
        </Box>

        <Box sx={roleCardStyle} onClick={() => router.push("?signup=investor")}>
          <ShowChartIcon sx={{ fontSize: 48, mb: 2, color: "#8e24aa" }} />
          <Typography fontWeight={800} color="#8e24aa">
            Register as Investor
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <RegisterContent />
    </Suspense>
  );
}

