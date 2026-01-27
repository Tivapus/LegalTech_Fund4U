"use client";

import {
  Box,
  Card,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

/* =======================
   Style: Role Selection Card
======================= */
const roleCardStyle = {
  cursor: "pointer",
  borderRadius: 3,
  paddingY: 4,
  paddingX: 3,
  width: { xs: "100%", sm: "50%" },
  textAlign: "center",
  border: "1px solid #E0E0E0",
  transition: "all 0.25s ease",
  backgroundColor: "#FFFFFF",

  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
};

function RegisterContent() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    juristicId: "",
    fullName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const signupType = searchParams.get("signup");

  /* =======================
     SME REGISTER
  ======================= */
  if (signupType === "sme") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F7F9FC",
          py: 8,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #1E88E5, #7E57C2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Register for SME
          </Typography>

          <Typography sx={{ color: "#5F6368" }}>
            กรุณากรอกข้อมูลเพื่อสมัครสมาชิกในฐานะผู้ระดมทุน
          </Typography>
        </Box>

        <Card
          sx={{
            maxWidth: 420,
            mx: "auto",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Password" type="password" name="password" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="ชื่อกิจการ" name="companyName" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="เลขนิติบุคคล" name="juristicId" margin="normal" onChange={handleChange} />

          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              bgcolor: "#1E88E5",
              color: "white",
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": { bgcolor: "#1565C0" },
            }}
            onClick={() => console.log("SME Register:", form)}
          >
            สมัครสมาชิก
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: "#1E88E5",
              color: "#1E88E5",
            }}
            onClick={() => router.push("/auth/register")}
          >
            กลับหน้าเลือกประเภท
          </Button>
        </Card>
      </Box>
    );
  }

  /* =======================
     INVESTOR REGISTER
  ======================= */
  if (signupType === "investor") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F7F9FC",
          py: 8,
          px: 2,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #1E88E5, #7E57C2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Register for Investor
          </Typography>

          <Typography sx={{ color: "#5F6368" }}>
            กรุณากรอกข้อมูลเพื่อสมัครสมาชิกในฐานะนักลงทุน
          </Typography>
        </Box>

        <Card
          sx={{
            maxWidth: 420,
            mx: "auto",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="Password" type="password" name="password" margin="normal" onChange={handleChange} />
          <TextField fullWidth label="ชื่อ-นามสกุล" name="fullName" margin="normal" onChange={handleChange} />

          <Button
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              bgcolor: "#1E88E5",
              color: "white",
              borderRadius: 2,
              fontWeight: 600,
            }}
            onClick={() => console.log("Investor Register:", form)}
          >
            สมัครสมาชิก
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: "#1E88E5",
              color: "#1E88E5",
            }}
            onClick={() => router.push("/auth/register")}
          >
            กลับหน้าเลือกประเภท
          </Button>
        </Card>
      </Box>
    );
  }

  /* =======================
     SELECT ROLE
  ======================= */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F9FC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 800 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}
        >
          สร้างบัญชีของคุณ กับ Fund4U
        </Typography>

        <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
          <Box sx={roleCardStyle} onClick={() => router.push("/auth/register?signup=sme")}>
            <StorefrontIcon sx={{ fontSize: 48, color: "#1E88E5", mb: 1 }} />
            <Typography fontWeight={700}>Register as SME</Typography>
            <Typography variant="body2" sx={{ color: "#5F6368", mt: 1 }}>
              ระดมทุนเพื่อขยายกิจการของคุณ
            </Typography>
          </Box>

          <Box sx={roleCardStyle} onClick={() => router.push("/auth/register?signup=investor")}>
            <ShowChartIcon sx={{ fontSize: 48, color: "#7E57C2", mb: 1 }} />
            <Typography fontWeight={700}>Register as Investor</Typography>
            <Typography variant="body2" sx={{ color: "#5F6368", mt: 1 }}>
              ค้นหาโอกาสการลงทุนที่มั่นคง
            </Typography>
          </Box>
        </Stack>
      </Box>
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
