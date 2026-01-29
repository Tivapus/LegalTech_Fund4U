"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
  LinearProgress,
  Button,
  Chip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { posts } from "@/data/post";
import { COLORS } from "@/constants/colors";
import { alpha } from "@mui/material";

export default function InvestorPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    "food",
    "agri",
    "service",
  ]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
  };

  const filteredPosts = posts.filter((post) =>
    post.tags.some((tag) => selectedFilters.includes(tag)),
  );

  return (
    <Grid container spacing={3}>
      {/* left sidebar */}
      <Grid
        size={{ xs: 12, md: 4, lg: 3 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Card
          sx={{
            p: 2.5,
            borderRadius: 4,
            bgcolor: "rgba(0,0,0,0.01)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, mb: 1, color: "text.primary" }}
          >
            ฟีเจอร์สำหรับคุณ
          </Typography>

          <List dense sx={{ p: 0 }}>
            <ListItemButton
              sx={{
                color: COLORS.BLUE,
                borderRadius: 2,
                mb: 0.5,
                "&:hover": { bgcolor: alpha(COLORS.BLUE, 0.08) },
              }}
            >
              <ListItemIcon sx={{ color: COLORS.BLUE }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary="สอนการลงทุนอย่างถูกต้อง"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                color: COLORS.PURPLE,
                borderRadius: 2,
                mb: 0.5,
                "&:hover": { bgcolor: alpha(COLORS.PURPLE, 0.08) },
              }}
            >
              <ListItemIcon sx={{ color: COLORS.PURPLE }}>
                <SwapHorizIcon />
              </ListItemIcon>
              <ListItemText
                primary="ซื้อขายตลาดรอง"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
            </ListItemButton>
            <ListItemButton
              sx={{
                color: COLORS.GOLD,
                borderRadius: 2,
                "&:hover": { bgcolor: alpha(COLORS.GOLD, 0.08) },
              }}
            >
              <ListItemIcon sx={{ color: COLORS.GOLD }}>
                <StarIcon />
              </ListItemIcon>
              <ListItemText
                primary="รายการโปรด"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            ตัวกรอง (Filter)
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters.includes("food")}
                  onChange={handleFilterChange}
                  name="food"
                />
              }
              label="อาหารและเครื่องดื่ม"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters.includes("agri")}
                  onChange={handleFilterChange}
                  name="agri"
                />
              }
              label="เกษตรกรรม"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFilters.includes("service")}
                  onChange={handleFilterChange}
                  name="service"
                />
              }
              label="บริการ"
            />
          </FormGroup>
        </Card>
      </Grid>

      {/* main */}
      <Grid size={{ xs: 12, md: 8, lg: 9 }}>
        <TextField
          fullWidth
          placeholder="ค้นหาโอกาสในการลงทุน..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          {filteredPosts.map((post) => {
            const pct = Math.min(100, (post.raised / post.target) * 100);
            return (
              <Grid size={12} key={post.id}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          src={post.logo}
                          variant="rounded"
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                            borderRadius: 2,
                          }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, lineHeight: 1.2 }}
                          >
                            {post.sme}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 0.5,
                              color: "text.secondary",
                            }}
                          >
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            <Typography variant="caption">
                              {post.location}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ color: "primary.main", mb: 1 }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {post.description}
                      </Typography>

                      <Box
                        sx={{
                          bgcolor: alpha(COLORS.PURPLE, 0.04),
                          p: 2.5,
                          borderRadius: 3,
                          border: `1px solid ${alpha(COLORS.PURPLE, 0.08)}`,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 800, color: "primary.main" }}
                          >
                            ข้อมูลธุรกิจพื้นฐาน:
                          </Typography>
                          <Chip
                            icon={
                              <VerifiedUserIcon
                                sx={{
                                  fontSize: "16px !important",
                                  color: `${COLORS.PURPLE} !important`,
                                }}
                              />
                            }
                            label={`การันตีเงินประกัน ${post.businessInfo.guarantee}%`}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              height: 26,
                              bgcolor: alpha(COLORS.PURPLE, 0.12),
                              color: COLORS.PURPLE,
                              border: `1px solid ${alpha(COLORS.PURPLE, 0.3)}`,
                              "& .MuiChip-label": { px: 1.5 },
                            }}
                          />
                        </Box>
                        <Grid container spacing={2}>
                          <Grid size={3}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ fontWeight: 600 }}
                            >
                              ส่วนแบ่งกำไร:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700 }}
                            >
                              {post.businessInfo.netProfit}
                            </Typography>
                          </Grid>
                          <Grid size={3}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ fontWeight: 600 }}
                            >
                              ระยะเวลาสัญญา:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700 }}
                            >
                              {post.businessInfo.contractPeriod}
                            </Typography>
                          </Grid>
                          <Grid size={3}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ fontWeight: 600 }}
                            >
                              ระยะเวลาคืนทุน
                              <br />
                              (คาดการณ์):
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 700 }}
                            >
                              {post.businessInfo.paybackPeriod}
                            </Typography>
                          </Grid>
                          <Grid size={3}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ fontWeight: 600 }}
                            >
                              ความเสี่ยง:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color:
                                  post.businessInfo.risk === "ต่ำ"
                                    ? "success.main"
                                    : post.businessInfo.risk === "ปานกลาง"
                                      ? "warning.main"
                                      : "error.main",
                              }}
                            >
                              {post.businessInfo.risk}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Box
                        sx={{
                          borderLeft: { md: "1px solid rgba(0,0,0,0.08)" },
                          pl: { md: 3 },
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 800 }}
                            >
                              ยอดระดมทุนปัจจุบัน
                            </Typography>
                            <Typography variant="body2" color="primary">
                              {Math.round(pct)}%
                            </Typography>
                          </Box>

                          <LinearProgress variant="determinate" value={pct} />

                          <Typography
                            variant="body2"
                            sx={{ textAlign: "right", mt: 1 }}
                          >
                            <b>฿{post.raised.toLocaleString()}</b>{" "}
                            <span style={{ color: "rgba(0,0,0,0.6)" }}>
                              / ฿{post.target.toLocaleString()}
                            </span>
                          </Typography>
                        </Box>

                        <Box>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              borderRadius: 2,
                              py: 1.2,
                              fontWeight: 700,
                              textTransform: "none",
                              boxShadow: "none",
                              bgcolor: COLORS.GOLD,
                              "&:hover": {
                                boxShadow: `0 4px 12px ${alpha(COLORS.GOLD, 0.3)}`,
                              },
                            }}
                          >
                            รายละเอียดสำหรับการลงทุน
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                              mt: 1.5,
                              borderRadius: 2,
                              py: 1.2,
                              fontWeight: 700,
                              textTransform: "none",
                            }}
                          >
                            งบการเงิน
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
