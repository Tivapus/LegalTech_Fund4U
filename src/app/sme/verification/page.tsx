"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Container,
  Grid,
  TextField,
  MenuItem,
  Divider,
  Chip,
  Stack,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  StepConnector,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VerifiedIcon from "@mui/icons-material/Verified";
import GavelIcon from "@mui/icons-material/Gavel";
import { useNotification } from "@/context/NotificationContext";

// Custom Styled Connector for Stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

const STEPS = [
  "Company Profile",
  "Identity & KYC",
  "Business Docs",
  "Review",
  "Completed",
] as const;

type StepKey = (typeof STEPS)[number];

const COUNTRIES = ["Thailand", "Singapore", "Malaysia", "Vietnam", "Other"];

function bytesToSize(bytes: number) {
  if (!Number.isFinite(bytes)) return "-";
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

function mkId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function SMEVerificationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const theme = useTheme();
  const { showNotification } = useNotification();

  // ===== Mock form state =====
  const [company, setCompany] = useState({
    legalName: "",
    registrationNo: "",
    country: "Thailand",
    officeAddress: "",
    contactEmail: "",
    phone: "",
  });

  const [kyc, setKyc] = useState({
    directorName: "",
    directorIdNo: "",
    idType: "National ID",
    isPep: false,
  });

  const [docs, setDocs] = useState({
    taxId: "",
    latestRevenue: "",
    note: "",
  });

  const [uploads, setUploads] = useState<Record<string, UploadedFile[]>>({
    "Company Logo": [],
    "Registration Snippet": [],
    "Identity & KYC": [],
    "Business Docs": [],
    Review: [],
    Completed: [],
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTargetStep, setUploadTargetStep] =
    useState<string>("Company Logo");

  const currentStepKey = STEPS[activeStep];

  const STEP_CONTENT = useMemo(
    () => [
      {
        stage: "Company information",
        meaning:
          "We use this information to verify your business registration and display your profile to investors once approved.",
        instruction:
          "Fill in all required fields exactly as shown on your registration documents. Mismatched details may delay approval.",
        requiredUploads: ["Company Logo", "Registration Snippet"],
      },
      {
        stage: "Identity verification (KYC)",
        meaning:
          "We must verify the identity of directors / authorized persons to meet compliance requirements.",
        instruction:
          "Upload clear, readable documents. Ensure your name and ID number are visible and not cropped.",
        requiredUploads: ["Identity & KYC"],
      },
      {
        stage: "Business documents",
        meaning:
          "We review core business documents to confirm legitimacy and basic financial standing.",
        instruction:
          "Upload the requested documents. Missing or outdated files will block the review step.",
        requiredUploads: ["Business Docs"],
      },
      {
        stage: "Compliance review",
        meaning:
          "Our team is reviewing your submission. This step may include manual checks and follow-up questions.",
        instruction:
          "No action required right now. If we need clarification, you’ll see a request here (mock).",
        requiredUploads: [],
      },
      {
        stage: "Verification completed",
        meaning:
          "Your verification is complete. You can now proceed to create and manage fundraising campaigns.",
        instruction:
          "Continue to the campaign page to set up your fundraising details.",
        requiredUploads: [],
      },
    ],
    [],
  );

  const currentContent = STEP_CONTENT[activeStep];

  // ===== Validation =====
  const stepErrors = useMemo(() => {
    const errs: string[] = [];
    if (activeStep === 0) {
      if (!company.legalName.trim())
        errs.push("Company legal name is required.");
      if (!company.registrationNo.trim())
        errs.push("Registration number is required.");
      if (uploads["Company Logo"].length === 0)
        errs.push("Please upload a company logo.");
      if (uploads["Registration Snippet"].length === 0)
        errs.push("Please upload a registration snippet.");
    } else if (activeStep === 1) {
      if (!kyc.directorName.trim())
        errs.push("Director full name is required.");
      if (uploads["Identity & KYC"].length === 0)
        errs.push("Please upload at least one identity document.");
    } else if (activeStep === 2) {
      if (!docs.taxId.trim()) errs.push("Tax ID is required.");
      if (uploads["Business Docs"].length < 2)
        errs.push("Please upload at least 2 business documents.");
    }
    return errs;
  }, [activeStep, company, kyc, docs, uploads]);

  const canProceedNormally = stepErrors.length === 0;

  // ===== Actions =====
  const handleNext = () => {
    if (activeStep === 3) return; // Prevent next on review step
    if (stepErrors.length > 0) {
      showNotification(
        `Action required: ${stepErrors[0]}${stepErrors.length > 1 ? ` (+${stepErrors.length - 1} more)` : ""}`,
        "error",
      );
    } else {
      setActiveStep((p) => p + 1);
    }

    if (activeStep === STEPS.length - 1) {
      router.push("/sme/campaign");
      return;
    }
  };

  const handleBack = () => {
    setActiveStep((p) => Math.max(0, p - 1));
  };

  const handleSkip = () => {
    if (activeStep === STEPS.length - 1) {
      router.push("/sme/campaign");
      return;
    }
    setActiveStep((p) => p + 1);
  };

  const openFilePicker = (step: string) => {
    setUploadTargetStep(step);
    inputRef.current?.click();
  };

  const onFilesSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploads((prev) => {
      const next = { ...prev };
      const mapped: UploadedFile[] = files.map((f) => ({
        id: mkId(),
        name: f.name,
        size: f.size,
        type: f.type,
        lastModified: f.lastModified,
      }));
      next[uploadTargetStep] = [...(next[uploadTargetStep] || []), ...mapped];
      return next;
    });
    e.target.value = "";
  };

  const removeUpload = (step: string, id: string) => {
    setUploads((prev) => ({
      ...prev,
      [step]: (prev[step] || []).filter((x) => x.id !== id),
    }));
  };

  // ===== Dynamic Sections =====
  const renderUploadSection = (step: string) => {
    const list = uploads[step] || [];
    const isGranular =
      step === "Company Logo" || step === "Registration Snippet";
    const required = isGranular
      ? [step]
      : (currentContent.requiredUploads ?? []);

    return (
      <Paper
        elevation={0}
        key={step}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: "blur(10px)",
          border: `1px dashed ${alpha(theme.palette.divider, 0.2)}`,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <CloudUploadIcon color="primary" />
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              {step}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            startIcon={<CloudUploadIcon />}
            onClick={() => openFilePicker(step)}
            sx={{
              borderRadius: 1.5,
              px: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Upload
          </Button>
        </Stack>

        {required.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1, fontWeight: 600 }}
            >
              REQUIRED DOCUMENTS:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: "wrap", gap: 1 }}
            >
              {required.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  size="small"
                  variant="filled"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    fontWeight: 500,
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {list.length === 0 ? (
          <Box
            sx={{
              py: 3,
              textAlign: "center",
              bgcolor: alpha(theme.palette.action.hover, 0.4),
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No files uploaded yet.
            </Typography>
          </Box>
        ) : (
          <List dense sx={{ width: "100%" }}>
            {list.map((f) => (
              <ListItem
                key={f.id}
                sx={{
                  bgcolor: "white",
                  mb: 1,
                  borderRadius: 2,
                  border: "1px solid #f0f0f0",
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => removeUpload(step, f.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" color="error" />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {f.name}
                    </Typography>
                  }
                  secondary={`${bytesToSize(f.size)} • ${f.type.split("/")[1]?.toUpperCase() || "DOC"}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    );
  };

  const renderStepFields = () => {
    const commonPaperStyle = {
      p: 4,
      borderRadius: 4,
      elevation: 0,
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      background: "linear-gradient(135deg, #ffffff 0%, #f9faff 100%)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
    };

    if (activeStep === 0) {
      return (
        <Paper sx={commonPaperStyle}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TaskAltIcon sx={{ mr: 1 }} /> Company Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Legal Company Name"
                variant="filled"
                value={company.legalName}
                onChange={(e) =>
                  setCompany({ ...company, legalName: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Registration Number"
                variant="filled"
                value={company.registrationNo}
                onChange={(e) =>
                  setCompany({ ...company, registrationNo: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Country"
                variant="filled"
                value={company.country}
                onChange={(e) =>
                  setCompany({ ...company, country: e.target.value })
                }
              >
                {COUNTRIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Company Email"
                variant="filled"
                value={company.contactEmail}
                onChange={(e) =>
                  setCompany({ ...company, contactEmail: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Registered Office Address"
                variant="filled"
                value={company.officeAddress}
                onChange={(e) =>
                  setCompany({ ...company, officeAddress: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Paper>
      );
    }

    if (activeStep === 1) {
      return (
        <Paper sx={commonPaperStyle}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <VerifiedIcon sx={{ mr: 1 }} /> Director Identity
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Director Full Name"
                variant="filled"
                value={kyc.directorName}
                onChange={(e) =>
                  setKyc({ ...kyc, directorName: e.target.value })
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                fullWidth
                label="ID Type"
                variant="filled"
                value={kyc.idType}
                onChange={(e) => setKyc({ ...kyc, idType: e.target.value })}
              >
                <MenuItem value="National ID">National ID</MenuItem>
                <MenuItem value="Passport">Passport</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label="ID Number"
                variant="filled"
                value={kyc.directorIdNo}
                onChange={(e) =>
                  setKyc({ ...kyc, directorIdNo: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Paper>
      );
    }

    if (activeStep === 2) {
      return (
        <Paper sx={commonPaperStyle}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              mb: 3,
              color: "primary.main",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GavelIcon sx={{ mr: 1 }} /> Financial & Legal Docs
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tax Identification Number"
                variant="filled"
                value={docs.taxId}
                onChange={(e) => setDocs({ ...docs, taxId: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Fiscal Year Revenue"
                variant="filled"
                value={docs.latestRevenue}
                onChange={(e) =>
                  setDocs({ ...docs, latestRevenue: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Additional Notes"
                variant="filled"
                value={docs.note}
                onChange={(e) => setDocs({ ...docs, note: e.target.value })}
              />
            </Grid>
          </Grid>
        </Paper>
      );
    }

    if (activeStep === 3) {
      return (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Box sx={{ position: "relative", display: "inline-flex", mb: 2 }}>
            <CheckCircleIcon
              sx={{ fontSize: 80, color: alpha(theme.palette.info.main, 0.3) }}
            />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            Submission Under Review
          </Typography>
          <Typography color="text.secondary">
            Our compliance team is currently validating your documents.
          </Typography>
          <Alert
            severity="info"
            sx={{ mt: 3, borderRadius: 2, textAlign: "left" }}
          >
            You will receive an email notification once the review is complete.
            Usually takes 1-2 business days.
          </Alert>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 6, textAlign: "center" }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 100, mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
          Verification Success!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Your business account is now fully verified and ready for fundraising.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push("/sme/campaign")}
          sx={{ borderRadius: 2, px: 6, py: 1.5, fontWeight: 700 }}
        >
          Manage My Campaign
        </Button>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        onChange={onFilesSelected}
      />

      {/* Hero Header */}
      <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 1,
            letterSpacing: "-0.02em",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Business Verification
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400, fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Complete verification to unlock campaign creation and investor
          visibility.
        </Typography>
      </Box>

      {/* Stepper with Premium Styles */}
      <Box sx={{ width: "100%", mb: { xs: 4, md: 8 } }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {STEPS.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.Mui-active": { color: "primary.main" },
                    "&.Mui-completed": { color: "primary.main" },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: activeStep === index ? 800 : 500,
                    fontSize: "0.85rem",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main Instruction & Form Area */}
      {activeStep < 4 && (
        <Grid container spacing={4}>
          <Grid size={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                borderLeft: `6px solid ${theme.palette.primary.main}`,
                mb: 4,
              }}
            >
              <Typography
                variant="overline"
                color="primary"
                sx={{ fontWeight: 800, letterSpacing: 1.5 }}
              >
                {currentStepKey}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, mt: 0.5 }}>
                {currentContent.stage}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {currentContent.meaning}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  bgcolor: "white",
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid #eee",
                }}
              >
                <InfoIcon
                  fontSize="small"
                  sx={{ color: "primary.main", mt: 0.3 }}
                />
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                  {currentContent.instruction}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          <Grid size={12}>
            <Stack spacing={4}>
              {renderStepFields()}
              {activeStep === 0 && (
                <>
                  {renderUploadSection("Company Logo")}
                  {renderUploadSection("Registration Snippet")}
                </>
              )}
              {activeStep > 0 &&
                activeStep < 3 &&
                renderUploadSection(currentStepKey)}
            </Stack>
          </Grid>
        </Grid>
      )}

      {activeStep === 4 && renderStepFields()}

      {/* Footer Navigation */}
      {activeStep < 4 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            mt: 6,
            pt: 4,
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button
            variant="text"
            startIcon={<ChevronLeftIcon />}
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{
              fontWeight: 700,
              color: "text.secondary",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Previous
          </Button>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="text"
              onClick={handleSkip}
              startIcon={<SkipNextIcon />}
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Skip Stage
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              disabled={activeStep === 3}
              endIcon={<ChevronRightIcon />}
              sx={{
                borderRadius: 2.5,
                px: 5,
                fontWeight: 900,
                width: { xs: "100%", sm: "auto" },
                boxShadow:
                  activeStep === 3
                    ? "none"
                    : "0 8px 16px rgba(33, 150, 243, 0.2)",
                bgcolor:
                  activeStep === 3
                    ? alpha(theme.palette.action.disabledBackground, 0.12)
                    : !canProceedNormally
                      ? alpha(theme.palette.primary.main, 0.7)
                      : "primary.main",
              }}
            >
              {activeStep === 3
                ? "Reviewing (Staff only)"
                : canProceedNormally
                  ? "Continue"
                  : "Next"}
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
