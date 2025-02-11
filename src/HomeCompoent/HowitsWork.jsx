import React from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ApiIcon from "@mui/icons-material/Api";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const steps = [
  {
    icon: <SearchIcon fontSize="large" />,
    title: "1. Search Location",
    desc: "Enter the city, district, or postal code to find accurate location data.",
  },
  {
    icon: <VpnKeyIcon fontSize="large" />,
    title: "2. Get API Key",
    desc: "Sign up and get your unique API key to start using the service.",
  },
  {
    icon: <ApiIcon fontSize="large" />,
    title: "3. Integrate API",
    desc: "Use the API in your project with simple GET requests.",
  },
  {
    icon: <DoneAllIcon fontSize="large" />,
    title: "4. Get Results",
    desc: "Receive real-time, accurate location data instantly.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        How It Works
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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
              <Box sx={{ color: "#1976d2", mb: 2 }}>{step.icon}</Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  {step.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
