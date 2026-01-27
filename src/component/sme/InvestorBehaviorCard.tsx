"use client";

import { useMemo, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Chip,
  Divider,
  Button,
  Avatar,
  Stack,
  Collapse,
} from "@mui/material";
import type { Investor } from "@/data/post";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface InvestorBehaviorCardProps {
  raisedFromHistory: number;
  investors: Investor[];
}

export default function InvestorBehaviorCard({
  raisedFromHistory,
  investors,
}: InvestorBehaviorCardProps) {
  const [showList, setShowList] = useState(false);

  const totalInvestors = investors.length;

  const returningInvestors = useMemo(
    () => investors.filter((i) => i.isReturning).length,
    [investors],
  );

  const returningRate = useMemo(
    () => (totalInvestors > 0 ? returningInvestors / totalInvestors : 0),
    [returningInvestors, totalInvestors],
  );

  const avgTicket = useMemo(() => {
    if (totalInvestors <= 0) return 0;
    return Math.round(raisedFromHistory / totalInvestors);
  }, [raisedFromHistory, totalInvestors]);

  const trustLabel =
    returningRate >= 0.3
      ? "Trust สูง"
      : returningRate >= 0.15
        ? "Trust กลาง"
        : "Trust ต่ำ";
  const trustColor: "success" | "warning" | "error" =
    returningRate >= 0.3
      ? "success"
      : returningRate >= 0.15
        ? "warning"
        : "error";

  const sortedInvestors = useMemo(() => {
    return [...investors].sort((a, b) => b.invested - a.invested);
  }, [investors]);

  return (
    <Card sx={{ p: 3, borderRadius: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          พฤติกรรมนักลงทุน
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {/* ✅ responsive: 1 แถวบน mobile, 3 คอลัมน์บน sm+ */}
        <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {totalInvestors}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            นักลงทุนทั้งหมด
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            ฿{avgTicket.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            เงินเฉลี่ย / คน
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "success.main" }}
          >
            {Math.round(returningRate * 100)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            นักลงทุนซ้ำ ({returningInvestors} คน)
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* ✅ responsive: xs = stack ลง, sm+ = row */}
        <Grid size={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: { xs: "center", sm: "center" },
                gap: 1.5,
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  Insight
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  นักลงทุนซ้ำ {returningInvestors} คน (
                  {Math.round(returningRate * 100)}%)
                </Typography>
              </Box>

              <Chip
                label={trustLabel}
                color={trustColor}
                variant="outlined"
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              />
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowList((v) => !v)}
              sx={{ alignSelf: "center" }}
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    transition: "transform 200ms ease",
                    transform: showList ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
            >
              {showList ? "ซ่อนรายชื่อ" : "ดูรายชื่อ"}
            </Button>
          </Box>
        </Grid>

        <Grid size={12}>
          <Collapse
            in={showList}
            timeout={250}
            easing="ease-in-out"
            unmountOnExit
          >
            <Box
              sx={{
                mt: 1.5,
                bgcolor: "rgba(0,0,0,0.03)",
                borderRadius: 2,
                p: { xs: 1.5, sm: 2 },
                overflow: "hidden",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                รายชื่อนักลงทุน
              </Typography>

              <Stack spacing={1}>
                {sortedInvestors.map((inv) => (
                  <Box
                    key={inv.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      p: 1,
                      borderRadius: 2,
                      bgcolor: "rgba(255,255,255,0.7)",
                      transition: "transform 120ms ease",
                      "&:hover": { transform: "translateY(-1px)" },
                    }}
                  >
                    {/* ✅ responsive: ชื่อยาวไม่ดันยอดตกบรรทัด */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        src={inv.avatar}
                        sx={{ width: 32, height: 32, flex: "0 0 auto" }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={inv.name}
                        >
                          {inv.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {new Date(inv.investedAt).toLocaleDateString()}
                          {inv.isReturning ? " • returning" : ""}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 800,
                        flex: "0 0 auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ฿{inv.invested.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
