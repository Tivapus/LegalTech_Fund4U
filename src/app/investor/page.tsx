"use client";
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
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import { posts } from "@/data/post";

export default function InvestorPage() {
  return (
    <Grid container spacing={3}>
      {/* left sidebar */}
      <Grid
        size={{ xs: 12, md: 4, lg: 3 }}
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <Card sx={{ p: 2.5, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            ฟีเจอร์สำหรับคุณ
          </Typography>

          <List dense sx={{ p: 0 }}>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="สอนการลงทุนอย่างถูกต้อง" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SwapHorizIcon />
              </ListItemIcon>
              <ListItemText primary="หุ้นกู้ตลาดรอง" />
            </ListItemButton>
            <ListItemButton sx={{ color: "error.main" }}>
              <ListItemIcon sx={{ color: "error.main" }}>
                <StarIcon />
              </ListItemIcon>
              <ListItemText primary="รายการโปรด" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            ตัวกรอง (Filter)
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="อาหารและเครื่องดื่ม"
            />
            <FormControlLabel control={<Checkbox />} label="เกษตรกรรม" />
            <FormControlLabel control={<Checkbox />} label="บริการ" />
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
          {posts.map((post) => {
            const pct = Math.min(100, (post.raised / post.target) * 100);
            return (
              <Grid size={12} key={post.id}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
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
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {post.sme}
                        </Typography>
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
                          bgcolor: "rgba(0,0,0,0.04)",
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 800, mb: 1 }}
                        >
                          ข้อมูลธุรกิจพื้นฐาน:
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={4}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              กำไรสุทธิ:
                            </Typography>
                            <Typography variant="body2">15%</Typography>
                          </Grid>
                          <Grid size={4}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              ระยะเวลาคืนทุน:
                            </Typography>
                            <Typography variant="body2">18 เดือน</Typography>
                          </Grid>
                          <Grid size={4}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              ความเสี่ยง:
                            </Typography>
                            <Typography variant="body2">ต่ำ</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Box
                        sx={{
                          borderLeft: { md: "1px solid rgba(0,0,0,0.08)" },
                          pl: { md: 3 },
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

                        <Button variant="contained" fullWidth>
                          ดูรายละเอียด & ลงทุน
                        </Button>
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
