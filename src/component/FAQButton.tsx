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
        width: { xs: 56, sm: "auto" },
        height: 56,
        padding: { xs: 0, sm: "0 20px" },
        minWidth: { xs: 56, sm: 64 },
        borderRadius: { xs: "50%", sm: "28px" },
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
      onClick={() => {
        alert("คำถามที่พบบ่อย (FAQ) กำลังจะมาเร็วๆ นี้!");
      }}
    >
      <HelpOutlineIcon sx={{ mr: { xs: 0, sm: 1 } }} />
      <Box
        component="span"
        sx={{
          display: { xs: "none", sm: "block" },
          fontSize: "0.95rem",
        }}
      >
        คำถามที่พบบ่อย (FAQ)
      </Box>
    </Fab>
  );
}
