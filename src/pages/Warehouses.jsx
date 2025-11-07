import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Grid, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Paper,} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  addWarehouseItem,
  updateWarehouseItem,
  deleteWarehouseItem,} from "../store/slices/warehousesSlice";
import { showSnackbar } from "../store/slices/uiSlice";

export default function Warehouses() {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouses);
  const materials = useSelector((state) => state.materials);

  const [selectedWarehouse, setSelectedWarehouse] = useState(
    warehouses[0]?.id || ""
  );
  const [form, setForm] = useState({ materialId: "", qty: "" });
  const [editing, setEditing] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const currentWarehouse = warehouses.find((w) => w.id === selectedWarehouse);

  const getMinQty = (materialId) => {
    const material = materials.find((m) => m.id === materialId);
    return material ? material.minQty : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.materialId || !form.qty)
      return dispatch(showSnackbar("⚠️ Please fill all fields"));

    const minQty = getMinQty(form.materialId);
    if (form.qty < minQty) {
      dispatch(
        showSnackbar(
          ` Quantity (${form.qty}) is less than minimum required (${minQty})`
        )
      );
      return;
    }

    if (editing) {
      dispatch(
        updateWarehouseItem({
          warehouseId: selectedWarehouse,
          item: form,
        })
      );
      dispatch(showSnackbar("✅ Inventory updated!"));
    } else {
      dispatch(
        addWarehouseItem({
          warehouseId: selectedWarehouse,
          item: { materialId: form.materialId, qty: form.qty },
        })
      );
      dispatch(showSnackbar("✅ Material added to warehouse"));
    }

    setForm({ materialId: "", qty: "" });
    setEditing(false);
    setOpenForm(false);
  };

  const handleDelete = (id) => {
    dispatch(
      deleteWarehouseItem({
        warehouseId: selectedWarehouse,
        materialId: id,
      })
    );
    dispatch(showSnackbar("🗑️ Material removed"));
  };

  return (
    <Box sx={{ p: 3 }}>

  <Grid
    container
    alignItems="center"
    justifyContent="space-between"
    sx={{ mb: 3 }}
  >
    
    <Grid item>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        🏭 Warehouses
      </Typography>
    </Grid>

   
    <Grid item>
      <TextField
        select
        label="Select Warehouse"
        value={selectedWarehouse}
        onChange={(e) => setSelectedWarehouse(e.target.value)}
        size="small"
        sx={{ width: 300, backgroundColor: "white" }}
      >
        {warehouses.map((w) => (
          <MenuItem key={w.id} value={w.id}>
            {w.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    
    <Grid item>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setForm({ materialId: "", qty: "" });
          setEditing(false);
          setOpenForm(true);
        }}
        sx={{
          backgroundColor: "#1976d2",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Add Material
      </Button>
    </Grid>
  </Grid>


      
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
          overflowX: "auto",
        }}
      >
        <CardContent>
          <Table component={Paper}>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Material ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentWarehouse?.inventory?.map((i) => (
                <TableRow key={i.materialId} hover>
                  <TableCell>{i.materialId}</TableCell>
                  <TableCell>{i.qty}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditing(true);
                        setForm(i);
                        setOpenForm(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(i.materialId)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Form */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editing ? "✏️ Edit Material Quantity" : "➕ Add to Warehouse"}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              select
              label="Material"
              name="materialId"
              value={form.materialId}
              onChange={(e) =>
                setForm({ ...form, materialId: e.target.value })
              }
              size="small"
              fullWidth
            >
              {materials.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Quantity"
              name="qty"
              type="number"
              size="small"
              value={form.qty}
              onChange={(e) =>
                setForm({ ...form, qty: Number(e.target.value) })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenForm(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
