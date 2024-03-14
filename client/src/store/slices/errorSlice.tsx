import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
    message: string;
    isError: boolean;
};

const initialState: ErrorState = {
    message: '',
    isError: false,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ message: string, isError: boolean }>) => {
            state.message = action.payload.message;
            state.isError = action.payload.isError;
        }
    }
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
