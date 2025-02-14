import React from "react";
import { Box, Grid, Typography, Link, IconButton, Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#222", color: "#fff", py: 4, mt: 4 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              Pakistan Location API provides real-time location data for cities, districts, and postal codes. 
              Get accurate and fast results for your applications.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link href="#" color="inherit" underline="none" sx={{ mb: 1, color: "#aaa" }}>
                Home
              </Link>
              <Link href="#" color="inherit" underline="none" sx={{ mb: 1, color: "#aaa" }}>
                API Docs
              </Link>
              <Link href="#" color="inherit" underline="none" sx={{ mb: 1, color: "#aaa" }}>
                Pricing
              </Link>
              <Link href="#" color="inherit" underline="none" sx={{ color: "#aaa" }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
              Email: support@pakistanapi.com
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
              Phone: +92 123 456 7890
            </Typography>

            {/* Social Media Icons */}
            <Box>
              <IconButton sx={{ color: "#aaa" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "#aaa" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "#aaa" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "#aaa" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 4, borderTop: "1px solid #444", pt: 2 }}>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            © {new Date().getFullYear()} Pakistan Location API. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
