"use client";

import { Fab, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function FAQButton() {
  return (
    <Fab
      variant="extended"
      sx={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 1300,
        width: "auto",
        height: 48,
        padding: "0 20px",
        minWidth: 64,
        borderRadius: "24px",
        bgcolor: "black",
        color: "white",
        textTransform: "none",
        fontWeight: 800,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        "&:hover": {
          bgcolor: "#333",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <HelpOutlineIcon sx={{ mr: 1 }} />
      <Box
        component="span"
        sx={{
          fontSize: "0.85rem",
        }}
      >
        คำถามที่พบบ่อย (FAQ)
      </Box>
    </Fab>
  );
}
