import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Dashboard,
  LocationCity,
  Map,
  Business,
  Room,
} from "@mui/icons-material";

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        {/* Navbar */}
        <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Admin Dashboard
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar
                alt="Admin"
                src="/static/images/avatar.png"
                sx={{ width: 40, height: 40, border: "2px solid white" }}
              />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <AccountCircle sx={{ marginRight: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ExitToApp sx={{ marginRight: 1, color: "red" }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          open={open}
          onClose={handleDrawerToggle}
          sx={{ ".MuiDrawer-paper": { width: 250, backgroundColor: "#0d47a1", color: "white" } }}
        >
          <Box sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "#1565c0" }}>
            <Avatar
              alt="Admin"
              src="/static/images/avatar.png"
              sx={{ width: 50, height: 50, border: "2px solid white", marginRight: 2 }}
            />
            <Typography variant="h6" fontWeight="bold">
              Admin
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: "white" }} />
          <List>
            {[
              { text: "Dashboard", icon: <Dashboard />, link: "/admin/dashboard" },
              { text: "Manage Provinces", icon: <Map />, link: "/admin/manageProvinces" },
              { text: "Manage Cities", icon: <LocationCity />, link: "/admin/manageCities" },
              { text: "Manage Districts", icon: <Business />, link: "/admin/manageDistricts" },
              { text: "Manage Areas", icon: <Room />, link: "admin//manageAreas" },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  ":hover": { backgroundColor: "#1e88e5" },
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <br />
      <br />
      <br />
    </>
  );
};

export default AdminNavbar;
