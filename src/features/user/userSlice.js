import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchUserTodoByUserId } from "./userApi";

const initialState = {
  status: "idle",
  userInfo: null ,//this will have more info
};


export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async(id)=>{
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      
      
  },
});

export const { increment } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserTodos = (state) => state.user.userTodos;
export default userSlice.reducer;