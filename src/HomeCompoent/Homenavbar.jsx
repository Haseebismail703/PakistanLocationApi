import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link , useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
 let navigate = useNavigate()
  const navItems = [
    { name: "Home", path: "/" },
    { name: "API Docs", path: "/apidoc" },
    // { name: "Pricing", path: "/pricing" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar for Desktop */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Pakistan Location API
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }} component={Link} to={item.path}>
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Get Started Button */}
          <Button variant="contained" color="secondary" sx={{ ml: 2 }} component={Link} to="register">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List  sx={{ width: 250 }}>
          {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.path} onClick={handleDrawerToggle}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <br /><br /><br />
    </>
  );
};

export default Navbar;
