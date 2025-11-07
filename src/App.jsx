// src/App.js
import React from "react";
import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Master from "./pages/Master";
import Warehouses from "./pages/Warehouses";
import Requests from "./pages/Requests";
import SnackbarManager from "./shared/SnackbarManager";
import Login from "./pages/Login";

import Carts from "./pages/Carts";
import Products from "./pages/Products";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />

      
      <Route path="/*" element={
          
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ width: '100%' }}>
                <Header />
                <Box sx={{ pt: '64px', px: 3, pb: 3 }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/master" element={<Master />} />
                    <Route path="/warehouses" element={<Warehouses />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/carts" element={<Carts/>}/>
                    <Route path="/products" element={<Products/>}/>
                  </Routes>
                </Box>
                <SnackbarManager />
              </Box>
            </Box>
          
        }
      />

      
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
}
