"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Container,
  Stack,
  alpha,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedIcon from "@mui/icons-material/Verified";
import { COLORS } from "@/constants/colors";

// ===== animations (no extra lib) =====
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  0%   { opacity: 0; transform: translateY(10px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const floaty = keyframes`
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (to - from) * eased);
      setValue(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();

  // mock stats numbers (count up)
  const investors = useCountUp(2500, 1100);
  const smes = useCountUp(120, 1000);
  const capital = useCountUp(500, 1200); // show as 500M+

  return (
    <Box sx={{ pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 15 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "3rem", md: "4.5rem" },
              mb: 3,
              background: `linear-gradient(45deg, ${COLORS.PURPLE} 30%, ${COLORS.GOLD} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              pb: 1,
              lineHeight: 1.4,
              // animation
              animation: `${fadeUp} 800ms ease-out both`,
            }}
          >
            ทุนถึงมือ ธุรกิจถึงฝัน<br />ระดมทุนเพื่อ SME ไทย
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontFamily: "inherit",
              mb: 6,
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto",
              animation: `${fadeUp} 900ms ease-out both`,
              animationDelay: "120ms",
            }}
          >
            Fund4U เชื่อมโยงความโปร่งใสสู่โอกาสการเติบโต ไม่ว่าคุณจะเป็นธุรกิจที่ต้องการขยายตัว หรือนักลงทุนที่มองหาความสำเร็จ เราพร้อมมอบโครงสร้างพื้นฐานที่ปลอดภัยเพื่อคุณ
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              animation: `${fadeUp} 900ms ease-out both`,
              animationDelay: "220ms",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push("/auth/login")}
              sx={{
                fontFamily: "inherit",
                px: 4,
                py: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: `0 10px 20px ${alpha(COLORS.PURPLE, 0.3)}`,
                transition: "transform 180ms ease, box-shadow 180ms ease",
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 14px 30px ${alpha(COLORS.PURPLE, 0.35)}`,
                },
              }}
            >
              เริ่มต้นใช้งานเลย
            </Button>
          </Stack>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: alpha(theme.palette.primary.main, 0.05),
            zIndex: -1,
            filter: "blur(50px)",
            animation: `${floaty} 6s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: alpha(theme.palette.secondary.main, 0.05),
            zIndex: -1,
            filter: "blur(50px)",
            animation: `${floaty} 7s ease-in-out infinite`,
            animationDelay: "200ms",
          }}
        />
      </Box>

      {/* Choice Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              onClick={() => router.push("/auth/register?signup=sme")}
              sx={{
                p: 6,
                borderRadius: 4,
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                border: "1px solid",
                borderColor: alpha(theme.palette.divider, 0.1),
                animation: `${popIn} 700ms ease-out both`,
                "&:hover": {
                  transform: "translateY(-12px)",
                  boxShadow: `0 30px 60px ${alpha(
                    theme.palette.primary.main,
                    0.15,
                  )}`,
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  mb: 3,
                  color: "primary.main",
                  animation: `${floaty} 5s ease-in-out infinite`,
                }}
              >
                <StorefrontIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h4" sx={{ fontFamily: "inherit", fontWeight: 800, mb: 2 }}>
                สมัครสมาชิก SME
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "inherit", mb: 4 }}>
                พร้อมระดมทุนเพื่อขยายธุรกิจของคุณแล้วหรือยัง? เข้าถึงกลุ่มนักลงทุนสถาบันและรายย่อยผ่านแพลตฟอร์มที่ปลอดภัยของเรา
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  fontFamily: "inherit",
                  mt: "auto",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  transition: "transform 160ms ease",
                  textTransform: "none",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                สมัครสมาชิก SME
              </Button>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              onClick={() => router.push("/auth/register?signup=investor")}
              sx={{
                p: 6,
                borderRadius: 4,
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                border: "1px solid",
                borderColor: alpha(theme.palette.divider, 0.1),
                animation: `${popIn} 700ms ease-out both`,
                animationDelay: "120ms",
                "&:hover": {
                  transform: "translateY(-12px)",
                  boxShadow: `0 30px 60px ${alpha(
                    theme.palette.secondary.main,
                    0.15,
                  )}`,
                  borderColor: theme.palette.secondary.main,
                },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.secondary.main, 0.1),
                  mb: 3,
                  color: "secondary.main",
                  animation: `${floaty} 5.5s ease-in-out infinite`,
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h4" sx={{ fontFamily: "inherit", fontWeight: 800, mb: 2 }}>
                สมัครสมาชิกนักลงทุน
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontFamily: "inherit", mb: 4 }}>
                ค้นพบโอกาสการลงทุนในธุรกิจดาวรุ่งที่ผ่านการตรวจสอบแล้ว กระจายพอร์ตการลงทุนของคุณด้วยการลงทุนใน SME ไทย ผลตอบแทนสูง
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                size="large"
                sx={{
                  fontFamily: "inherit",
                  mt: "auto",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  transition: "transform 160ms ease",
                  textTransform: "none",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                สมัครสมาชิกนักลงทุน
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Trust & Features Section */}
      <Box sx={{ bgcolor: "#fafafa", py: 10, borderRadius: { xs: 0, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            sx={{
              fontFamily: "inherit",
              fontWeight: 800,
              mb: 8,
              animation: `${fadeUp} 800ms ease-out both`,
            }}
          >
            สร้างขึ้นเพื่อความเชื่อมั่นและความโปร่งใส
          </Typography>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <GavelIcon
                  color="primary"
                  sx={{
                    fontSize: 50,
                    animation: `${floaty} 6s ease-in-out infinite`,
                  }}
                />
                <Typography variant="h6" sx={{ fontFamily: "inherit", fontWeight: 800 }}>
                  ถูกต้องตามกฎหมาย
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "inherit" }}>
                  แพลตฟอร์มของเราถูกพัฒนาโดยมีเทคโนโลยีทางด้านกฎหมายเป็นหัวใจสำคัญ เพื่อให้มั่นใจว่าทุกธุรกรรมเป็นไปตามข้อกำหนดของภาครัฐ
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <VerifiedIcon
                  color="success"
                  sx={{
                    fontSize: 50,
                    animation: `${floaty} 6.3s ease-in-out infinite`,
                  }}
                />
                <Typography variant="h6" sx={{ fontFamily: "inherit", fontWeight: 800 }}>
                  คัดกรองทุกโอกาส
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "inherit" }}>
                  SME ทุกรายต้องผ่านกระบวนการตรวจสอบหลายขั้นตอน เพื่อยืนยันความน่าเชื่อถือและความมั่นคงทางการเงินก่อนเริ่มระดมทุน
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <SecurityIcon
                  color="info"
                  sx={{
                    fontSize: 50,
                    animation: `${floaty} 6.6s ease-in-out infinite`,
                  }}
                />
                <Typography variant="h6" sx={{ fontFamily: "inherit", fontWeight: 800 }}>
                  ความปลอดภัยระดับธนาคาร
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "inherit" }}>
                  ข้อมูลและเงินทุนของคุณได้รับการคุ้มครองด้วยการเข้ารหัสและความปลอดภัยตามมาตรฐานสากล
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Counter (Mock) */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container spacing={2} justifyContent="space-around">
          {[
            {
              label: "นักลงทุนที่ใช้งานอยู่",
              value: `${investors.toLocaleString()}+`,
            },
            { label: "SME ที่ระดมทุนสำเร็จ", value: `${smes.toLocaleString()}+` },
            {
              label: "เงินทุนหมุนเวียน",
              value: `฿${capital.toLocaleString()}M+`,
            },
          ].map((stat, i) => (
            <Grid
              size={{ xs: 12, sm: 4 }}
              key={i}
              sx={{
                textAlign: "center",
                animation: `${fadeUp} 800ms ease-out both`,
                animationDelay: `${120 + i * 120}ms`,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "inherit",
                  fontWeight: 900,
                  color: "primary.main",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontFamily: "inherit", fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
