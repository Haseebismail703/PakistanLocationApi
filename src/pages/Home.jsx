import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Container, Box, Button, Grid, Card, CardContent } from "@mui/material";
import Homenavbar from "../HomeCompoent/Homenavbar";
import HeroSection from "../HomeCompoent/HeroSection";
import KeyFeature from "../HomeCompoent/KeyFeature";
import HowitsWorks from "../HomeCompoent/HowitsWork";
import Pricing from "../HomeCompoent/Pricing";
import Footer from "../HomeCompoent/Footer";
const HomePage = () => {
  return (
    <>
      <Homenavbar />
      <HeroSection />
      <KeyFeature />
      <HowitsWorks />
      <Pricing/>
      <Footer/>
    </>
  );
};

export default HomePage;
