import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line,} from "recharts";

export default function Dashboard() {
  const warehouses = useSelector((state) => state.warehouses);
  const requests = useSelector((state) => state.requests);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

 
  const [stats, setStats] = useState({
    totalMaterials: 0,
    totalStock: 0,
    pending: 0,
    accepted: 0,
  });

  useEffect(() => {
    const allMaterials = new Set();
    let totalStock = 0;

    warehouses.forEach((w) =>
      w.inventory.forEach((i) => {
        allMaterials.add(i.materialId);
        totalStock += i.qty;
      })
    );

    const pending = requests.filter((r) => r.status === "Pending").length;
    const accepted = requests.filter((r) => r.status === "Accepted").length;

    setStats({
      totalMaterials: allMaterials.size,
      totalStock,
      pending,
      accepted,
    });
  }, [warehouses, requests]);

  
  const lineData = [
    { name: "Total Materials", value: stats.totalMaterials },
    { name: "Total Stock", value: stats.totalStock },
    { name: "Pending", value: stats.pending },
    { name: "Accepted", value: stats.accepted },
  ];

  
  const counts = {
    Accepted: requests.filter((r) => r.status === "Accepted").length,
    Rejected: requests.filter((r) => r.status === "Rejected").length,
    Pending: requests.filter((r) => r.status === "Pending").length,
  };

  const pieData = [
    { name: "Accepted", value: counts.Accepted, color: "#4caf50" },
    { name: "Rejected", value: counts.Rejected, color: "#f44336" },
    { name: "Pending", value: counts.Pending, color: "#ff9800" },
  ];

  //br
  let data = [];
  if (selectedWarehouse === "") {
    const totals = {};
    warehouses.forEach((w) =>
      w.inventory.forEach((i) => {
        totals[i.materialId] = (totals[i.materialId] || 0) + i.qty;
      })
    );
    data = Object.keys(totals).map((key) => ({
      materialId: key,
      qty: totals[key],
    }));
  } else {
    const warehouse = warehouses.find((w) => w.id === selectedWarehouse);
    data =
      warehouse?.inventory.map((i) => ({
        materialId: i.materialId,
        qty: i.qty,
      })) || [];
  }

  //tab
  const tableData = warehouses.flatMap((w) =>
    w.inventory.map((i) => ({
      warehouse: w.name,
      materialId: i.materialId,
      qty: i.qty,
    }))
  );

  return (
    <Box sx={{ p: 3 }}>
        {/* ✅ Top Summary Stat Cards (Full Width, Equal 4 Cards) */}
<Grid
  container
  spacing={3}
  sx={{
    mb: 4,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "stretch",
  }}
>
  {[
    {
      title: "Total Materials",
      value: stats.totalMaterials,
      color: "#1976d2",
      icon: "📦",
    },
    {
      title: "Total Stock",
      value: stats.totalStock,
      color: "#2e7d32",
      icon: "🏭",
    },
    {
      title: "Pending Requests",
      value: stats.pending,
      color: "#ed6c02",
      icon: "⏳",
    },
    {
      title: "Accepted Requests",
      value: stats.accepted,
      color: "#0288d1",
      icon: "✅",
    },
  ].map((card, index) => (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card
        sx={{
          p: 3,
          height: 180,
          borderRadius: 3,
          boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          background: `linear-gradient(135deg, ${card.color} 0%, #42a5f5 100%)`,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          "&:hover": { transform: "translateY(-5px)", boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
        }}
      >
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {card.icon} {card.title}
          </Typography>
        </Box>

        
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", letterSpacing: 1, mt: 1 }}
        >
          {card.value}
        </Typography>

      
        <Box sx={{ width: "100%", height: 50 }}>
          <ResponsiveContainer>
            <LineChart
              data={[
                { name: "1", value: Math.random() * 10 },
                { name: "2", value: Math.random() * 10 },
                { name: "3", value: Math.random() * 10 },
                { name: "4", value: Math.random() * 10 },
              ]}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </Grid>
  ))}
</Grid>

     
      <Card
        sx={{
          height: 350,
          width: "100%",
          mb: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          📊 Inventory Overview
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1976d2"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

     
<Grid item xs={12} sx={{ mt: 12 }}>
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 3,
    }}
  >
    {/* === Left Box: Pie Chart === */}
    <Box
      sx={{
        flex: "1 1 48%",
        minWidth: "350px",
        background: "linear-gradient(145deg, #f5f7fa, #e4ebf0)",
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#333",
          letterSpacing: 0.5,
        }}
      >
        📈 Request Status Overview
      </Typography>

      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={130}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>

    {/* === Right Box: Bar Chart === */}
    <Box
      sx={{
        flex: "1 1 48%",
        minWidth: "350px",
        background: "linear-gradient(145deg, #f5f7fa, #e4ebf0)",
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#333",
          letterSpacing: 0.5,
        }}
      >
        🏢 Warehouse Material Stock
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Show Warehouse</InputLabel>
        <Select
          value={selectedWarehouse}
          label="Show Warehouse"
          onChange={(e) => setSelectedWarehouse(e.target.value)}
        >
          <MenuItem value="">
            <em>All Warehouses</em>
          </MenuItem>
          {warehouses.map((w) => (
            <MenuItem key={w.id} value={w.id}>
              {w.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="materialId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="qty" fill="#487093" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
</Grid>





      
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          📦 Material Inventory Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Warehouse
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Material ID
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.warehouse}</TableCell>
                  <TableCell>{row.materialId}</TableCell>
                  <TableCell>{row.qty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
