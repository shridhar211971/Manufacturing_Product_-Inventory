// src/pages/Login.js
import React, { useState } from "react";
import { Box, Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "shri" && password === "123") {
       const userData = {
        username,
        role: "admin",
        loginTime: new Date().toLocaleString(),
      };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
      window.location.reload();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card sx={{ p: 4, width: 320, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            🔐 Login
          </Typography>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            sx={{ mb: 4 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ mb: 4 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
