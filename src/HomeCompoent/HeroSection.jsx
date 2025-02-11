import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const images = [
  "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/27175431/tomb.jpg",
  "https://visitinpakistan.com/wp-content/uploads/2020/02/1920px-Faisal_Masjid_From_Damn_e_koh.jpg",
  "https://historypak.com/wp-content/uploads/2013/07/Untitled.png",
  "https://bilaltravels.net/wp-content/uploads/2023/06/dolmen-mall.jpg"
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Pakistan Location API
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 3 }}>
          Access accurate real-time location data for cities, districts, and postal codes across Pakistan.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
