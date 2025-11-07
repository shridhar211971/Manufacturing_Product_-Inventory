import { createSlice } from "@reduxjs/toolkit";

const initialWarehouses = [
  {
    id: "w1",
    name: "Main Warehouse",
    inventory: [
      { materialId: "m1", qty: 200 },
      { materialId: "m2", qty: 100 },
    ],
  },
  {
    id: "w2",
    name: "Secondary Warehouse",
    inventory: [
      { materialId: "m3", qty: 150 },
      { materialId: "m1", qty: 80 },
    ],
  },
];

const warehousesSlice = createSlice({
  name: "warehouses",
  initialState: initialWarehouses,
  reducers: {
    // add
    addWarehouseItem(state, action) {
      const { warehouseId, item } = action.payload;
      const wh = state.find((w) => w.id === warehouseId);
      if (!wh) return;

      const existing = wh.inventory.find(
        (i) => i.materialId === item.materialId
      );
      if (existing) {
        existing.qty += item.qty;
      } else {
        wh.inventory.push(item);
      }
    },

    // update
    updateWarehouseItem(state, action) {
      const { warehouseId, item } = action.payload;
      const wh = state.find((w) => w.id === warehouseId);
      if (!wh) return;

      const existing = wh.inventory.find(
        (i) => i.materialId === item.materialId
      );
      if (existing) {
        existing.qty = item.qty;
      }
    },

    // delet
    deleteWarehouseItem(state, action) {
      const { warehouseId, materialId } = action.payload;
      const wh = state.find((w) => w.id === warehouseId);
      if (!wh) return;

      wh.inventory = wh.inventory.filter(
        (i) => i.materialId !== materialId
      );
    },

    // change
    changeInventory(state, action) {
      const { warehouseId, materialId, delta } = action.payload;
      const wh = state.find((w) => w.id === warehouseId);
      if (!wh) return;

      const item = wh.inventory.find((i) => i.materialId === materialId);
      if (item) {
        item.qty = Math.max(0, item.qty + delta);
      } else if (delta > 0) {
        wh.inventory.push({ materialId, qty: delta });
      }
    },
  },
});

export const {
  addWarehouseItem,
  updateWarehouseItem,
  deleteWarehouseItem,
  changeInventory,
} = warehousesSlice.actions;
export default warehousesSlice.reducer;
