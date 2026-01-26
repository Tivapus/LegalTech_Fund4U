"use client";

import {
  Card,
  Box,
  Avatar,
  Typography,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";

interface ProfileCardProps {
  post: {
    logo: string;
    sme: string;
    target: number;
    raised: number;
    history: { month: string; amount: number }[];
  };
  pct: number;
  raisedFromHistory: number;
}

export default function ProfileCard({
  post,
  pct,
  raisedFromHistory,
}: ProfileCardProps) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src={post.logo}
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
          {post.sme}
        </Typography>
        <Chip label="ผู้ระดมทุนตรวจสอบแล้ว" color="success" sx={{ mt: 1 }} />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
        สถานะการระดมทุน
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2">
          ฿{raisedFromHistory.toLocaleString()}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 10,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.08)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
          },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {Math.round(pct)}%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          เหลือ ฿{Math.max(0, post.target - post.raised).toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
}
