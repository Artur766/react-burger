import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../utils/auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, userName }) => {
    const response = await registerApi(email, password, userName);
    return response;
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await loginApi(email, password);
    return response;
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: "",
      email: ""
    },
    loading: false,
    error: "",
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
  }
});

export default authSlice.reducer;

export const { } = authSlice.actions;