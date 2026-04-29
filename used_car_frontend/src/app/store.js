import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Import reducers
import carReducer from "../cars/carSlice";
//import authReducer from "../features/auth/authSlice";

// Create store
export const store = configureStore({
    reducer: {
        cars: carReducer,
        // auth: authReducer,
    },

    devTools: import.meta.env.MODE !== "production",

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // disable if using non-serializable data like Date
        }),
});

setupListeners(store.dispatch);