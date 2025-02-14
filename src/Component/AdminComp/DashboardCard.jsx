import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const stats = [
  { title: "All Users", count: "1,200", icon: <PeopleIcon />, color: "#1976d2" },
  { title: "All Admins", count: "50", icon: <AdminPanelSettingsIcon />, color: "#d32f2f" },
  { title: "Total Paid Members", count: "700", icon: <MonetizationOnIcon />, color: "#388e3c" },
  { title: "Free Members", count: "500", icon: <PersonAddAltIcon />, color: "#ff9800" },
];

const DashboardCards = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <Box
                sx={{
                  backgroundColor: stat.color,
                  width: 60,
                  height: 60,
                  mx: "auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: 30,
                  mb: 2,
                }}
              >
                {stat.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {stat.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;
