
import { configureStore } from "@reduxjs/toolkit";
import materialsReducer from "./slices/materialsSlice";
import warehousesReducer from "./slices/warehousesSlice";
import requestsReducer from "./slices/requestsSlice";
import uiReducer from "./slices/uiSlice";
import cartsReducer from "./slices/cartsSlice";


const store = configureStore({
  reducer: {
    carts: cartsReducer,
    materials: materialsReducer,
    warehouses: warehousesReducer,
    requests: requestsReducer,
    ui: uiReducer,
  },
});

export default store;