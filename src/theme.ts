"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a44ccd", // Lakers Purple
    },
    secondary: {
      main: "#fcac3f", // Lakers Gold
    },
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "var(--font-noto-sans-thai-looped), var(--font-geist-sans), Arial, sans-serif",
  },
});

export default theme;
