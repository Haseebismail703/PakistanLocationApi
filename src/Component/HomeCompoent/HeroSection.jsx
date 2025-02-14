import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "motion/react"; 

const images = [
  "https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/27175431/tomb.jpg",
  "https://visitinpakistan.com/wp-content/uploads/2020/02/1920px-Faisal_Masjid_From_Damn_e_koh.jpg",
  "https://historypak.com/wp-content/uploads/2013/07/Untitled.png",
  "https://bilaltravels.net/wp-content/uploads/2023/06/dolmen-mall.jpg",
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
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }} // Pehle invisible, thoda upar aur chhota
          animate={{ opacity: 1, y: 0, scale: 1 }} // Dheere se appear hoga aur normal size pe aayega
          transition={{ duration: 0.8, ease: "easeOut" }} // 0.8s ka smooth effect
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Pakistan Location API
          </Typography>
        </motion.div>

        {/* Animated Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Pehle neeche aur invisible
          animate={{ opacity: 1, y: 0 }} // Dheere se upar aayega
           // Thoda delay for smooth effect
            >
          <Typography variant="h6" component="p" sx={{ mb: 3 }} >
            Access accurate real-time location data for cities, districts, and postal codes across Pakistan.
          </Typography>
          </motion.div>
        {/* Animated Button */}
        <motion.div
          whileHover={{ scale: 1.1 }} // Jab hover karega to size thoda bada hoga
          whileTap={{ scale: 0.9 }} // Jab click hoga to halka chhota hoga
        >
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            size="large"
          >
            Get Started
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
