"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Stack,
  alpha,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";
import { posts } from "@/data/post";

export default function SMEListingPage() {
  const router = useRouter();
  const theme = useTheme();

  // Mock campaigns - combining static posts with some metadata
  const campaigns = posts.map((p, idx) => ({
    ...p,
    id: idx + 1,
    status: idx === 0 ? "Active" : "Completed",
    raised: p.history.reduce((acc, h) => acc + h.amount, 0),
    backers: p.investors.length,
    daysLeft: idx === 0 ? 12 : 0,
    image: `/image.png`,
  }));

  const toDetail = (id: number) => {
    router.push(`/sme/campaign/${id}`);
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 6,
          p: { xs: 4, md: 6 },
          borderRadius: 5,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.5)} 100%)`,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={3}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, mb: 1, color: "text.primary" }}
            >
              Campaign Dashboard
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400, opacity: 0.8 }}
            >
              Manage your fundraising efforts and track progress in real-time.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: "14px",
              px: 4,
              py: 1.8,
              fontWeight: 800,
              textTransform: "none",
              fontSize: "1rem",
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Create New Campaign
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {campaigns
          .filter((c) => c.id === 1)
          .map((camp) => {
            const progress = Math.min(100, (camp.raised / camp.target) * 100);

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={camp.id}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    bgcolor: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: "blur(12px)",
                    border: "1px solid",
                    borderColor: alpha(theme.palette.divider, 0.1),
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={camp.image}
                      alt={camp.title}
                    />
                    <Chip
                      label={camp.status}
                      size="small"
                      color={camp.status === "Active" ? "success" : "default"}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontWeight: 800,
                        backdropFilter: "blur(4px)",
                        bgcolor:
                          camp.status === "Active"
                            ? alpha(theme.palette.success.main, 0.9)
                            : alpha(theme.palette.grey[500], 0.9),
                      }}
                    />
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1 }}
                      >
                        {camp.title}
                      </Typography>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "40px",
                      }}
                    >
                      {camp.description}
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {progress.toFixed(0)}% Funded
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Target: ${Number(camp.target).toLocaleString()}
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      />
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid size={4}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          Raised
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800 }}
                        >
                          ${camp.raised.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid size={4}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          Backers
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800 }}
                        >
                          {camp.backers}
                        </Typography>
                      </Grid>
                      <Grid size={4}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          Days Left
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800 }}
                        >
                          {camp.daysLeft}d
                        </Typography>
                      </Grid>
                    </Grid>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={() => toDetail(camp.id)}
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 800,
                        py: 1.5,
                        textTransform: "none",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          boxShadow: "none",
                        },
                      }}
                    >
                      View Campaign Summary
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
