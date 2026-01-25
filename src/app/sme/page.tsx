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

export default function SMEPage() {
  const myPost = posts[0];
  const pct = Math.min(100, (myPost.raised / myPost.target) * 100);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={myPost.logo}
              variant="rounded"
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                borderRadius: 3,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {myPost.sme}
            </Typography>
            <Chip
              label="ผู้ระดมทุนตรวจสอบแล้ว"
              color="success"
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
            สถานะการระดมทุน
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">
              ฿{myPost.raised.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              เป้าหมาย ฿{myPost.target.toLocaleString()}
            </Typography>
          </Box>

          <LinearProgress variant="determinate" value={pct} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            {Math.round(pct)}%
          </Typography>
        </Card>

        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            ข้อมูลธุรกิจ (Dashboard)
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ยอดขายเดือนที่แล้ว:
            </Typography>
            <Typography variant="body2">฿45,000</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              จำนวนลูกค้าประจำ:
            </Typography>
            <Typography variant="body2">120 คน</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              คะแนนรีวิว:
            </Typography>
            <Typography variant="body2">4.8/5.0</Typography>
          </Box>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
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
            <Button variant="contained" color="warning" size="small">
              แก้ไขโพสต์
            </Button>
          </Box>

          <Typography variant="h6" sx={{ color: "primary.main", mt: 2, mb: 1 }}>
            {myPost.title}
          </Typography>
          <Typography variant="body2">{myPost.description}</Typography>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              bgcolor: "rgba(0,0,0,0.04)",
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2">
              โฆษณาโพสต์นี้ เพื่อให้คนเห็นเยอะขึ้น
            </Typography>
            <Button variant="contained">Boost Post</Button>
          </Box>
        </Card>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          สถิติการเข้าชม
        </Typography>

        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} sx={{ textAlign: "center" }}>
            <Grid size={6}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                1,250
              </Typography>
              <Typography variant="body2" color="text.secondary">
                คนเห็นโพสต์
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "success.main" }}
              >
                85
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ความสนใจ
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
