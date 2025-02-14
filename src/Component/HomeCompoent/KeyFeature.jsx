import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { motion } from "motion/react";
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
    <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#f4f4f4", px: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
          Key Features
        </Typography>
      </motion.div>

      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
             drag
             dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }} // Limit drag area
             whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} // Hover effect
             whileTap={{ scale: 0.9 }} // Click effect
             initial={{ opacity: 0, y: 50 }} // Initial slide effect
             animate={{ opacity: 1, y: 0 }} // Smooth appearance
             transition={{ duration: 0.5, ease: "easeOut" }} // Smooth timing
             style={{cursor: "grabbing"}} // Cursor style
            >
              <Card
                sx={{
                  maxWidth: 350,
                  mx: "auto",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 2,
                  transition: "0.3s",
                }}
              >
                <Box sx={{ color: "#1976d2", mb: 2 }}>{feature.icon}</Box>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;
