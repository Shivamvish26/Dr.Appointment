import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    alert: alertReducer,
    user: userSlice.reducer,
  },
});
