// src/shared/SnackbarManager.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { hideSnackbar } from "../store/slices/uiSlice";

export default function SnackbarManager() {
  const snack = useSelector((s) => s.ui.snack);
  const dispatch = useDispatch();

  const open = !!snack;

  return (
    <Snackbar
      open={open}
      message={snack?.message || ""}
      autoHideDuration={3000}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}
