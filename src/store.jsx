import { configureStore } from "@reduxjs/toolkit";
// import departmentReducer from "./api/department/departmentSlice";

export const store = configureStore({
  reducer: {
    // department: departmentReducer,
  },
});
