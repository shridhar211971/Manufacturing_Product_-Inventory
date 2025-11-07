import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialMaterials = [
  { id: "m1", name: "Steel Rod", type: "Raw", minQty: 50 },
  { id: "m2", name: "Lubricant Oil", type: "Chemical", minQty: 50 },
  { id: "m3", name: "Copper Wire", type: "Raw", minQty: 50 },
];

const materialsSlice = createSlice({
  name: "materials",
  initialState: initialMaterials,
  reducers: {
    addMaterial: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(payload) {
        return { payload: { id: nanoid(), ...payload } };
      },
    },
    updateMaterial(state, action) {
      const index = state.findIndex((m) => m.id === action.payload.id);
      if (index >= 0) state[index] = action.payload;
    },
    deleteMaterial(state, action) {
      return state.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addMaterial, updateMaterial, deleteMaterial } = materialsSlice.actions;
export default materialsSlice.reducer;
