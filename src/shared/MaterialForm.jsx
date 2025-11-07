import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions,} from "@mui/material";

export default function MaterialForm({ open, material, onSubmit, onClose }) {
  const [form, setForm] = useState({ id: "", name: "", type: "", minQty: 50 });

  useEffect(() => {
    if (material) setForm(material);
    else setForm({ id: "", name: "", type: "", minQty: 50 });
  }, [material]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return alert("Please fill all fields");
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {material ? "✏️ Edit Material" : "➕ Add Material"}
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            name="id"
            label="Material ID"
            value={form.id}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <TextField
            name="name"
            label="Material Name"
            value={form.name}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <TextField
            name="type"
            label="Type"
            value={form.type}
            onChange={handleChange}
            size="small"
            fullWidth
          />
          <TextField
            name="minQty"
            label="Min Qty"
            type="number"
            value={form.minQty}
            onChange={handleChange}
            size="small"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {material ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
