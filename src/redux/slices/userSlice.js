//this file will contain the actions and reducers along with initial state for redux store

import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSucessfull: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const { loginSucessfull } = userSlice.actions;
export default userSlice.reducer;

