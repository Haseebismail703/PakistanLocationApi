import React, { useState, useRef, useContext } from 'react'
// import './Login.css'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography,Grid } from "@mui/material";
import api from '../../Api/api';

const Login = () => {
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)


  const navigate = useNavigate();
  const loginSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(emailInputRef.current.value, passwordInputRef.current.value);
    try {
      const response = await axios.post(`${api}/users/login`, {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      //  console.log(response)
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data))
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        // navigate("/login");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("There was an error registering!", error);
    }
  }
  return (
    <div>

      <Grid container style={{ height: "100vh" }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            background: "linear-gradient(to bottom, #1a73e8, #0047ab)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h3" style={{ fontWeight: "bold", marginBottom: "20px" }}>
            GoFinance
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "30px" }}>
            The most popular peer-to-peer lending at SEA
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              color: "#1a73e8",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Read More
          </Button>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: "20px" }}>
            Hello Again!
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "30px" }}>
            Welcome Back
          </Typography>
          {/* Form */}
          <Box
            component="form"
            onSubmit={loginSubmitHandler}
            noValidate
            autoComplete="off"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <TextField
              fullWidth
              inputRef={emailInputRef}
              type='email'
              label="Email Address"
              variant="outlined"
              margin="normal"
              required
              autoComplete="on"
            />
            <TextField
              fullWidth
              inputRef={passwordInputRef}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              autoComplete="on"
            />
            <Button
              type='submit'
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#1a73e8",
                color: "white",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              onClick={() => {
                navigate("/forget-password");
              }}
              style={{
                backgroundColor: "transparent",
                color: "#1a73e8",
                fontWeight: "bold",
                marginTop: "10px",
                textTransform: "none",
                fontSize: "20px"
              }}
            >
              Forgot Password
            </Button>
            <Typography variant="body2" style={{ marginTop: "20px", textAlign: "center" }}>
              Don't have an account?{" "}
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#1a73e8",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}


export default Login