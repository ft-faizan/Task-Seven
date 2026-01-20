import { configureStore } from "@reduxjs/toolkit";
import trashReducer from "./trashSlice";

const Store = configureStore({
  reducer: {
    trash: trashReducer,
  },
});

export default Store;
