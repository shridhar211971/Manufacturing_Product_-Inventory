import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
//   const res = await fetch("https://dummyjson.com/carts");
//   const data = await res.json();
//   return data.carts;
// });

export const fetchCarts = createAsyncThunk("carts/fetchCarts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://dummyjson.com/carts");
   
    return response.data.carts;
  } catch (error) {
    
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartsSlice.reducer;
