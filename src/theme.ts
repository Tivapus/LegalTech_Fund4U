"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: {
      primary: "#000000",
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: "var(--font-noto-sans-thai), var(--font-geist-sans), Arial, sans-serif",
  },
});

export default theme;
