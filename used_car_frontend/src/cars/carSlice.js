import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

/**
 *  FETCH CARS (with filters, pagination, sorting)
 */
export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (params, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/cars", { params });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch cars");
        }
    }
);

/**
 * CREATE CAR (ADMIN)
 */
export const createCar = createAsyncThunk(
    "cars/createCar",
    async (car, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/admin/cars", car);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Create failed");
        }
    }
);

/**
 * UPDATE CAR
 */
export const updateCar = createAsyncThunk(
    "cars/updateCar",
    async ({ id, car }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/api/admin/cars/${id}`, car);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Update failed");
        }
    }
);

/**
 * DELETE CAR
 */
export const deleteCar = createAsyncThunk(
    "cars/deleteCar",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/api/admin/cars/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Delete failed");
        }
    }
);

/**
 * INITIAL STATE
 */
const initialState = {
    list: [],
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
    loading: false,
    error: null,
};

/**
 * SLICE
 */
const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createCar.fulfilled, (state, action) => {
                state.list.unshift(action.payload);
            })

            .addCase(updateCar.fulfilled, (state, action) => {
                const index = state.list.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            })

            .addCase(deleteCar.fulfilled, (state, action) => {
                state.list = state.list.filter(c => c.id !== action.payload);
            });
    },
});

export const { clearError } = carSlice.actions;

export default carSlice.reducer;