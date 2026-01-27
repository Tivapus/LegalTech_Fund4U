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
              fontWeight: 900,
              fontSize: { xs: "3rem", md: "4.5rem" },
              mb: 3,
              background: "linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,

              // animation
              animation: `${fadeUp} 800ms ease-out both`,
            }}
          >
            Revolutionizing SME <br /> Capital with LegalTech
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              mb: 6,
              fontWeight: 400,
              maxWidth: "700px",
              mx: "auto",
              animation: `${fadeUp} 900ms ease-out both`,
              animationDelay: "120ms",
            }}
          >
            Fund4U connect transparency with opportunity. Whether you're a
            business looking to scale or an investor seeking growth, we provide
            the secure infrastructure for success.
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
                px: 4,
                py: 2,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: "0 10px 20px rgba(33, 150, 243, 0.3)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 30px rgba(33, 150, 243, 0.35)",
                },
              }}
            >
              Get Started Now
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
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                Register as SME
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Ready to raise capital and grow your business? Access
                institutional and retail investors through our secure platform.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  mt: "auto",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  transition: "transform 160ms ease",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                Register as SME
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
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                Register as Investor
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Discover vetted investment opportunities in rising businesses.
                Diversify your portfolio with high-yield SME bonds.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                size="large"
                sx={{
                  mt: "auto",
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  transition: "transform 160ms ease",
                  "&:hover": { transform: "translateY(-1px)" },
                }}
              >
                Register as Investor
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
              fontWeight: 800,
              mb: 8,
              animation: `${fadeUp} 800ms ease-out both`,
            }}
          >
            Built for Trust and Transparency
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
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Legally Compliant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our platform is engineered with LegalTech at its core,
                  ensuring all regulatory requirements are met for every
                  transaction.
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
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Vetted Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Every SME undergoes a multi-stage verification process to
                  ensure credibility and financial stability before listing.
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
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Bank-Grade Security
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your data and funds are protected by industry-leading
                  encryption and security protocols.
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
              label: "Active Investors",
              value: `${investors.toLocaleString()}+`,
            },
            { label: "SMEs Funded", value: `${smes.toLocaleString()}+` },
            {
              label: "Capital Raised",
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
                sx={{ fontWeight: 500 }}
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
