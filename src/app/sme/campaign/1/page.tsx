"use client";
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { posts } from "@/data/post";
import EditPostDialog from "@/component/EditPostDialog";
import { useMemo, useState } from "react";
import FundraisingMonthlyChart from "@/component/FundraisingMonthlyChart";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProfileCard from "@/component/sme/ProfileCard";
import SMEInfoCard from "@/component/sme/SMEInfoCard";
import ViewStatSection from "@/component/sme/ViewStatSection";
import InvestorBehaviorCard from "@/component/sme/InvestorBehaviorCard";

export default function SMECampaignPage() {
  const router = useRouter();
  const theme = useTheme();
  const [post, setPost] = useState(() => posts[0]);
  const raisedFromHistory = useMemo(() => {
    return post.history.reduce((acc, h) => acc + h.amount, 0);
  }, [post.history]);

  const pct = useMemo(() => {
    const target = Number(post.target);
    const raised = raisedFromHistory;

    if (!Number.isFinite(target) || target <= 0) return 0;
    if (!Number.isFinite(raised) || raised < 0) return 0;

    return Math.max(0, Math.min(100, (raised / target) * 100));
  }, [raisedFromHistory, post.target]);

  const monthlyIncrement = post.history.map((h) => ({
    date: `${h.month}-01`,
    amount: h.amount,
  }));

  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Box sx={{ pb: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/sme/campaign")}
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "text.secondary",
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            color: "primary.main",
          },
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Back to Campaigns
      </Button>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }} container spacing={3} direction="column">
          <Box sx={{ position: "sticky", top: 100 }}>
            <ProfileCard
              post={post}
              pct={pct}
              raisedFromHistory={raisedFromHistory}
            />
            <Box sx={{ mt: 3 }}>
              <SMEInfoCard />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }} container spacing={3}>
          <Card
            sx={{
              p: 4,
              borderRadius: "24px",
              width: "100%",
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.1),
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: "text.primary" }}
              >
                Campaign Overview
              </Typography>
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={() => setOpenEdit(true)}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 800,
                  textTransform: "none",
                  px: 3,
                }}
              >
                Edit Campaign
              </Button>
            </Box>

            <Typography
              variant="h6"
              sx={{ color: "primary.main", mb: 2, fontWeight: 700 }}
            >
              Goal: {post.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {post.description}
            </Typography>
          </Card>
          <Card
            sx={{
              p: 4,
              borderRadius: "24px",
              width: "100%",
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.1),
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>
              Fundraising Momentum
            </Typography>

            <FundraisingMonthlyChart
              data={monthlyIncrement}
              target={post.target}
              height={340}
            />
          </Card>
          <InvestorBehaviorCard
            raisedFromHistory={raisedFromHistory}
            investors={post.investors}
          />
          <ViewStatSection />
        </Grid>
        <EditPostDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          initialTitle={post.title}
          initialDescription={post.description}
          onSave={({ title, description }) => {
            setPost((prev) => ({ ...prev, title, description }));
            setOpenEdit(false);
          }}
        />
      </Grid>
    </Box>
  );
}
