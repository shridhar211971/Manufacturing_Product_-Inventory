// src/store/slices/requestsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialRequests = [
  {
    id: "req1",
    client: "Client A",
    materialId: "m1",
    qty: 30,
    warehouseId: "w1",
    status: "Pending",
  },
  {
    id: "req2",
    client: "Client B",
    materialId: "m2",
    qty: 60,
    warehouseId: "w2",
    status: "Pending",
  },
  {
    id: "req3",
    client: "Client C",
    materialId: "m3",
    qty: 40,
    warehouseId: "w2",
    status: "Pending",
  },
  {
    id: "req4",
    client: "Client A",
    materialId: "m2",
    qty: 70,
    warehouseId: "w1",
    status: "Pending",
  },
];

const requestsSlice = createSlice({
  name: "requests",
  initialState: initialRequests,
  reducers: {
    updateRequestStatus(state, action) {
      const { id, status } = action.payload;
      const req = state.find((r) => r.id === id);
      if (req) req.status = status;
    },
  },
});

export const { updateRequestStatus } = requestsSlice.actions;
export default requestsSlice.reducer;
