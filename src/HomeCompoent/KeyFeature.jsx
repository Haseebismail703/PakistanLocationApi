import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import VerifiedIcon from "@mui/icons-material/Verified";

const features = [
  { icon: <LocationOnIcon fontSize="large" />, title: "Accurate Location Data", desc: "Get precise city, district, and postal code details across Pakistan." },
  { icon: <PublicIcon fontSize="large" />, title: "Nationwide Coverage", desc: "Covers all major cities, districts, and remote areas." },
  { icon: <SpeedIcon fontSize="large" />, title: "Fast API Response", desc: "Optimized for speed and efficiency, ensuring quick results." },
  { icon: <SecurityIcon fontSize="large" />, title: "Secure & Reliable", desc: "High-end security to protect data privacy and integrity." },
  { icon: <DataUsageIcon fontSize="large" />, title: "Real-time Data", desc: "Fetch the latest and most updated location information." },
  { icon: <VerifiedIcon fontSize="large" />, title: "Developer Friendly", desc: "Easy-to-use API with clear documentation and examples." },
];

const KeyFeatures = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#f4f4f4" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Key Features
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <Box sx={{ color: "#1976d2", mb: 2 }}>{feature.icon}</Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;
