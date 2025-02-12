import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button } from "@mui/material";

const plans = [
  {
    name: "Free",
    price: "$0/month",
    features: ["Basic API Access", "Limited Requests", "Community Support"],
    buttonText: "Get Started",
    color: "#1976d2",
  },
  {
    name: "Pro",
    price: "5000PKR /month",
    features: ["Full API Access", "Higher Rate Limits", "Email Support"],
    buttonText: "Choose Plan",
    color: "#388e3c",
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    features: ["Unlimited Access", "Dedicated Support", "Custom Integrations"],
    buttonText: "Contact Us",
    color: "#d32f2f",
  },
];

const PricingPlans = () => {
  return (
    <Box sx={{ py: 8, textAlign: "center", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Pricing Plans
      </Typography>

      <Grid container px={2} spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                // maxWidth: 350,
                // mx: "auto",
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ color: plan.color, mb: 2 }}>
                {plan.name}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                {plan.price}
              </Typography>
              <CardContent>
                {plan.features.map((feature, i) => (
                  <Typography key={i} variant="body2" sx={{ mb: 1, color: "gray" }}>
                    ✅ {feature}
                  </Typography>
                ))}
              </CardContent>
              <Button
                variant="contained"
                sx={{ backgroundColor: plan.color, color: "#fff", mt: 2 }}
              >
                {plan.buttonText}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PricingPlans;
