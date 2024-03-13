import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface ErrorState {
    message: string;
};

const initialState: ErrorState = {
    message: ''
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        }
    }
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
