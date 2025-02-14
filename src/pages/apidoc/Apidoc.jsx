import React from "react";
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import Navbar from "../../Component/HomeCompoent/Homenavbar";
const apiEndpoints = [
  { method: "GET", endpoint: "/api/country", description: "Get country details (Pakistan)" },
  { method: "GET", endpoint: "/api/provinces", description: "List all provinces" },
  { method: "GET", endpoint: "/api/provinces/{id}", description: "Get province details" },
  { method: "GET", endpoint: "/api/districts", description: "List all districts" },
  { method: "GET", endpoint: "/api/districts/{id}", description: "Get district details" },
  { method: "GET", endpoint: "/api/cities", description: "List all cities" },
  { method: "GET", endpoint: "/api/cities/{id}", description: "Get city details" },
  { method: "GET", endpoint: "/api/areas", description: "List all areas" },
  { method: "GET", endpoint: "/api/areas/{id}", description: "Get area details" },
];

const ApiDocs = () => {
  return (
    <>
    <Navbar />
    <Box sx={{ py: 5, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Container maxWidth="md">
        {/* Title Section */}
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
          Public API Documentation
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, color: "gray" }}>
          Easily access location data of Pakistan with our REST API. Cached via Redis for fast performance.
        </Typography>

        {/* API Table */}
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Method</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Endpoint</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiEndpoints.map((api, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell>
                    <Chip label={api.method} color="primary" sx={{ fontWeight: "bold" }} />
                  </TableCell>
                  <TableCell sx={{ fontFamily: "monospace", fontWeight: "bold" }}>{api.endpoint}</TableCell>
                  <TableCell>{api.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
    </>
  );
};

export default ApiDocs;
