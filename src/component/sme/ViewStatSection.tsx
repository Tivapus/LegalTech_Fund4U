"use client";

import { Card, Typography, Grid, Divider, Box, Button } from "@mui/material";

export default function ViewStatSection() {
  const views = 1250;
  const interested = 120;
  const invested = 12;

  const interestedRate = views > 0 ? (interested / views) * 100 : 0;
  const investedRate = views > 0 ? (invested / views) * 100 : 0;

  return (
    <Card sx={{ p: 3, borderRadius: 3, width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "black" }}>
        สถิติการเข้าชม
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          textAlign: "center",
        }}
      >
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {views.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            คนเห็นโพสต์
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "success.main" }}
          >
            {interested.toLocaleString()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {interestedRate.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              จากการเข้าชม
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            ความสนใจ
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "warning.main" }}
          >
            {invested.toLocaleString()}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {investedRate.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              conversion
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            ลงทุนจริง
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              bgcolor: "rgba(0,0,0,0.04)",
              p: 2,
              borderRadius: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
              textAlign: "left",
            }}
          >
            <Typography variant="body2">
              โฆษณาโพสต์นี้ เพื่อให้คนเห็นเยอะขึ้น และเพิ่มโอกาสในการระดมทุน
            </Typography>

            <Button
              variant="contained"
              sx={{
                alignSelf: { xs: "flex-start", sm: "auto" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Boost Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
