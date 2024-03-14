import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../types/types";

const initialState: UserState = {
    username: "",
    token: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ username: string, token: string }>) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        unsetUser: (state) => { // logout
            state = initialState;
        }
    },
    // extraReducers ?
})

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
