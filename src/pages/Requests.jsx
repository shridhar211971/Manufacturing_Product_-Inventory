// src/pages/Requests.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import { useSelector, useDispatch } from "react-redux";
import {  Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Tooltip,
} from "@mui/material";
import { updateWarehouseItem } from "../store/slices/warehousesSlice";
import { updateRequestStatus } from "../store/slices/requestsSlice";
import { showSnackbar } from "../store/slices/uiSlice";

export default function Requests() {
  const dispatch = useDispatch();
  const warehouses = useSelector((state) => state.warehouses);
  const materials = useSelector((state) => state.materials);
  const requests = useSelector((state) => state.requests);
  const [receipt, setReceipt] = useState(null);

  // ✅ Helper: check if request can be accepted
  const canAccept = (r) => {
    const warehouse = warehouses.find((w) => w.id === r.warehouseId);
    const item = warehouse?.inventory.find((i) => i.materialId === r.materialId);
    const mat = materials.find((m) => m.id === r.materialId);

    if (!warehouse || !item) return " Material not found in warehouse";
    if (!mat) return " Material not found in master data";

    const newQty = item.qty - r.qty;
    if (item.qty < r.qty) return " Not enough quantity in warehouse";
    if (newQty < mat.minQty)
      return ` After issuing, stock (${newQty}) goes below min (${mat.minQty})`;

    return null;
  };

  //accep
  const handleAccept = (r) => {
    const error = canAccept(r);
    if (error) {
      dispatch(showSnackbar(error));
      return;
    }

    const warehouse = warehouses.find((w) => w.id === r.warehouseId);
    const item = warehouse.inventory.find((i) => i.materialId === r.materialId);
    const mat = materials.find((m) => m.id === r.materialId);
    const newQty = item.qty - r.qty;

    // 
    dispatch(
      updateWarehouseItem({
        warehouseId: r.warehouseId,
        item: { materialId: r.materialId, qty: newQty },
      })
    );

    // status
    dispatch(updateRequestStatus({ id: r.id, status: "Accepted" }));
    dispatch(showSnackbar("✅ Request accepted and material issued"));

    //receipt
    const receiptObj = {
      client: r.client,
      material: mat.name,
      qty: r.qty,
      issueDate: new Date().toLocaleDateString(),
      issueFrom: warehouse.name,
    };
    setReceipt(receiptObj);

    // pdf
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Material Issue Receipt", 60, 20);
    doc.setFontSize(12);
    doc.text(`Client Name: ${receiptObj.client}`, 20, 40);
    doc.text(`Material: ${receiptObj.material}`, 20, 50);
    doc.text(`Quantity: ${receiptObj.qty}`, 20, 60);
    doc.text(`Issue Date: ${receiptObj.issueDate}`, 20, 70);
    doc.text(`Issued From: ${receiptObj.issueFrom}`, 20, 80);
    doc.text("Signature: _______________________", 20, 100);
    doc.save(`Receipt_${receiptObj.client}_${receiptObj.material}.pdf`);
  };

  // rejh
  const handleReject = (r) => {
    dispatch(updateRequestStatus({ id: r.id, status: "Rejected" }));
    dispatch(showSnackbar(`❌ Request from ${r.client} rejected.`));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          🌍🚚🚛 Material Requests
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.map((r) => {
              const error = canAccept(r);

              
              const warehouse = warehouses.find((w) => w.id === r.warehouseId);
              const material = materials.find((m) => m.id === r.materialId);

              return (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.client}</TableCell>
                  <TableCell>{material ? material.name : " Unknown"}</TableCell>
                  <TableCell>{r.qty}</TableCell>
                  <TableCell>{warehouse ? warehouse.name : " Unknown"}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        r.status === "Accepted"
                          ? "green"
                          : r.status === "Rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {r.status}
                  </TableCell>
                  <TableCell>
                    {r.status === "Pending" && (
                      <>
                        <Tooltip
                          title={error ? error : "Accept this request"}
                          arrow
                          disableHoverListener={!error}
                        >
                          <span>
                            <Button
                              size="small" variant="contained" color="success" onClick={() => handleAccept(r)}  sx={{ mr: 1 }}  disabled={!!error}  >
                              Accept
                            </Button>
                          </span>
                        </Tooltip>

                        <Button size="small" variant="contained" color="error" onClick={() => handleReject(r)} >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* 🧾 Receipt Section */}
        {receipt && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              background: "#f9f9f9",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              🧾 Material Issue Receipt
            </Typography>
            <Typography>Client: {receipt.client}</Typography>
            <Typography>Material: {receipt.material}</Typography>
            <Typography>Quantity: {receipt.qty}</Typography>
            <Typography>Issue Date: {receipt.issueDate}</Typography>
            <Typography>Issued From: {receipt.issueFrom}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
