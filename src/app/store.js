import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice"
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
    user: userReducer
  },
});
