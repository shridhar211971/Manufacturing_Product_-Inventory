import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  Box, Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Grid, Paper,} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { addMaterial, updateMaterial, deleteMaterial,} from "../store/slices/materialsSlice";
import { showSnackbar } from "../store/slices/uiSlice";
import MaterialForm from "../shared/MaterialForm";

export default function Master() {
  const dispatch = useDispatch();
  const materials = useSelector((state) => state.materials);

  const [editing, setEditing] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleAdd = (data) => {
    dispatch(addMaterial(data));
    dispatch(showSnackbar("✅ Material added successfully!"));
  };

  const handleUpdate = (data) => {
    dispatch(updateMaterial(data));
    dispatch(showSnackbar("✅ Material updated successfully!"));
  };

  const handleDelete = (id) => {
    dispatch(deleteMaterial(id));
    dispatch(showSnackbar("🗑️ Material deleted!"));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Row */}
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🧾 Master — Material List
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenForm(true)}
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

      {/* Table */}
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Min Qty</TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {materials.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell>{m.id}</TableCell>
                  <TableCell>{m.name}</TableCell>
                  <TableCell>{m.type}</TableCell>
                  <TableCell>{m.minQty}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEditing(m);
                        setOpenForm(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(m.id)}
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
      <MaterialForm
        open={openForm}
        material={editing}
        onSubmit={editing ? handleUpdate : handleAdd}
        onClose={() => {
          setOpenForm(false);
          setEditing(null);
        }}
      />
    </Box>
  );
}
