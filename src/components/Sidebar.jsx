// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider, Box, Button, Tooltip, useMediaQuery,} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Products from "../pages/Products";
import ShoppingBag from "@mui/icons-material/ShoppingBag"


const drawerWidth = 230;

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Master", icon: <InventoryIcon />, path: "/master" },
    { text: "Warehouses", icon: <WarehouseIcon />, path: "/warehouses" },
    { text: "Requests", icon: <RequestPageIcon />, path: "/requests" },
     { text: "Carts", icon: <ShoppingCartIcon />, path: "/carts" },
     {text: "Products", icon: <ShoppingBag />, path:"/products" }
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
      aria-label="sidebar"
    >
      <Drawer
        variant={isMdUp ? "permanent" : "temporary"}
        open={isMdUp ? true : open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:
              "linear-gradient(180deg, #1565c0 0%, #0d47a1 100%)",
            color: "white",
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 3,
          },
        }}
      >
        <Box>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              📦 Inventory
            </Typography>
          </Toolbar>

          <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />

          <List>
            {menuItems.map((item) => (
              <Tooltip title={item.text} placement="right" key={item.text}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => !isMdUp && setOpen(false)}
                  sx={{
                    color: "white",
                    py: 1.1,
                    borderRadius: 1,
                    mx: 1,
                    mb: 0.5,
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255,255,255,0.12)"
                        : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight:
                        location.pathname === item.path ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)", mb: 2 }} />
          <Button
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            color="error"
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#d32f2f",
              "&:hover": { bgcolor: "#b71c1c" },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
