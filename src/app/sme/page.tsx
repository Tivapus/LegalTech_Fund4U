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
} from "@mui/material";
import { posts } from "@/data/post";
import EditPostDialog from "@/component/EditPostDialog";
import { useMemo, useState } from "react";
import FundraisingMonthlyChart from "@/component/FundraisingMonthlyChart";
import ProfileCard from "@/component/sme/ProfileCard";
import SMEInfoCard from "@/component/sme/SMEInfoCard";
import ViewStatSection from "@/component/sme/ViewStatSection";
import InvestorBehaviorCard from "@/component/sme/InvestorBehaviorCard";

export default function SMEPage() {
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
    amount: h.amount, // เดือนนั้นได้เท่าไหร่
  }));

  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 4 }} container spacing={3} direction="column">
        <ProfileCard
          post={post}
          pct={pct}
          raisedFromHistory={raisedFromHistory}
        />

        <SMEInfoCard />
        <ViewStatSection />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }} container spacing={3}>
        <Card sx={{ p: 3, borderRadius: 3, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              โพสต์ปัจจุบันของคุณ
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => setOpenEdit(true)}
            >
              แก้ไขโพสต์
            </Button>
          </Box>

          <Typography variant="h6" sx={{ color: "primary.main", mt: 2, mb: 1 }}>
            เป้าหมายในการระดมทุน: {post.title}
          </Typography>
          <Typography variant="body2">{post.description}</Typography>
        </Card>
        <Card sx={{ p: 3, borderRadius: 3, width: "100%" }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            การระดมทุนรายเดือน (อดีต → ปัจจุบัน)
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
  );
}
