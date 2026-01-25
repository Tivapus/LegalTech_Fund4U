"use client";

import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }} color="black">
        ร่วมสนับสนุน SME ไทยให้เติบโต
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Fund4U - แพลตฟอร์มระดมทุนเพื่อความฝันของธุรกิจขนาดเล็ก
      </Typography>
    </Box>
  );
}
