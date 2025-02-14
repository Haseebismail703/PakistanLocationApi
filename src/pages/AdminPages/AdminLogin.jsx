import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Lock } from "@mui/icons-material";
import api from '../../Api/api';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${api}/admins/login`, credentials);
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      setCredentials({ email: "", password: "" });
      //   navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f6f8">
      <Paper elevation={10} sx={{ p: 4, maxWidth: 400, textAlign: "center", borderRadius: 3 }}>
        <Lock sx={{ fontSize: 50, color: "#1976d2", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Admin Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            fullWidth
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#1976d2", color: "white", fontWeight: "bold" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin;