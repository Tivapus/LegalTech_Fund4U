"use client";

import { Card, Typography, Box } from "@mui/material";

export default function SMEInfoCard() {
  return (
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
  );
}
