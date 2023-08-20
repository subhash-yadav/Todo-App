import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addNewTodo,
  deleteTodo,
  fetchTodoById,
  fetchTodoByUserId,
  updateTodo,
} from "./todoAPI";

const initialState = {
  todos: [],
  status: "idle",
  selectedTodo: null,
  editId: null,
};
export const addNewTodoAsync = createAsyncThunk(
  "todo/fetchAllTodo",
  async (newTodo) => {
    const response = await addNewTodo(newTodo);
    return response.data;
  }
);
export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todo) => {
    const response = await updateTodo(todo);
    return response.data;
  }
);
export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId) => {
    const response = await deleteTodo(todoId);
    return response.data;
  }
);
export const fetchTodoByUserIdAsync = createAsyncThunk(
  "todo/fetchTodoByUserId",
  async (userId) => {
    const response = await fetchTodoByUserId(userId);
    return response.data;
  }
);
export const fetchTodoByIdAsync = createAsyncThunk(
  "todo/fetchTodoById",
  async (id) => {
    const response = await fetchTodoById(id);
    return response.data;
  }
);
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getEditId: (state, action) => {
      state.editId = action.payload;
    },
    clearSelectedTodo: (state, action) => {
      state.selectedTodo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos.push(action.payload);
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.todos[index] = action.payload;
      })
      .addCase(fetchTodoByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.todos.splice(index, 1);
      })
      .addCase(fetchTodoByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedTodo = action.payload;
      });
  },
});
export const { getEditId, clearSelectedTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todo.todos;
export const selectedTodoById = (state) => state.todo.selectedTodo;
export const selectEditId = (state) => state.todo.editId;

export default todoSlice.reducer;
