"use client";

import { Box, Card, Typography, Button, Stack } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const blackInteractiveBox = {
  cursor: "pointer",
  border: "1.5px solid black",
  borderRadius: 2,
  paddingY: 3,
  paddingX: 2,
  width: { xs: "100%", sm: "50%" },
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "black",
    color: "white",
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  },

  "&:hover *": {
    color: "white",
  },

  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },

  "&:focus-visible": {
    outline: "3px solid rgba(0,0,0,0.4)",
    outlineOffset: 2,
  },
};

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signupType = searchParams.get("signup");

  const handleSelectRole = (role: string) => {
    router.push(`/auth/register?signup=${role}`);
  };

  if (signupType === "sme") {
    return (
      <Box sx={{ textAlign: "center", py: { xs: 4, md: 8 }, px: 2 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" }, color: "black" }}
        >
          Register for SME
        </Typography>
        <Typography color="text.secondary" mb={4}>
          กรุณากรอกข้อมูลเพื่อสมัครสมาชิกในฐานะผู้ระดมทุน
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
          onClick={() => router.push("/auth/register")}
        >
          กลับหน้าเลือกประเภท
        </Button>
      </Box>
    );
  }

  if (signupType === "investor") {
    return (
      <Box sx={{ textAlign: "center", py: { xs: 4, md: 8 }, px: 2 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          sx={{ fontSize: { xs: "1.75rem", md: "2.125rem" }, color: "black" }}
        >
          Register for Investor
        </Typography>
        <Typography color="text.secondary" mb={4}>
          กรุณากรอกข้อมูลเพื่อสมัครสมาชิกในฐานะนักลงทุน
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          sx={{
            bgcolor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
          onClick={() => router.push("/auth/register")}
        >
          กลับหน้าเลือกประเภท
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "70vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        py: { xs: 6, md: 0 },
        px: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          mb: 4,
          textAlign: "center",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
        color="black"
      >
        สร้างบัญชีของคุณ กับ Fund4U
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"center"}
        sx={{ width: "100%", maxWidth: 700 }}
      >
        <Box
          role="button"
          tabIndex={0}
          onClick={() => handleSelectRole("sme")}
          onKeyDown={(e) => e.key === "Enter" && handleSelectRole("sme")}
          sx={blackInteractiveBox}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <StorefrontIcon sx={{ fontSize: 40, color: "black" }} />
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1, color: "black" }}>
                ผู้ระดมทุน (ก๋วยเตี๋ยวป้าณี)
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", px: 2, color: "black" }}
              >
                เข้าถึงโอกาสในการลงทุนธุรกิจ SMEs ที่มีศักยภาพในการเติบโตสูง
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          role="button"
          tabIndex={0}
          onClick={() => handleSelectRole("investor")}
          onKeyDown={(e) => e.key === "Enter" && handleSelectRole("investor")}
          sx={blackInteractiveBox}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <ShowChartIcon sx={{ fontSize: 40, color: "black" }} />
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1, color: "black" }}>
                นักลงทุน (Mr. Ruay)
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", px: 2, color: "black" }}
              >
                ทางเลือกการระดมทุนสำหรับ SME เพื่อขยายกิจการ
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
