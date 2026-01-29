"use client";

import { createTheme } from "@mui/material/styles";
import { COLORS } from "@/constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PURPLE,
    },
    secondary: {
      main: COLORS.GOLD,
    },
    text: {
      primary: COLORS.BLACK,
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "var(--font-noto-sans-thai-looped), var(--font-geist-sans), Arial, sans-serif",
  },
});

export default theme;
