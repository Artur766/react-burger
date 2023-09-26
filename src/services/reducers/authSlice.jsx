import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfoApi, loginApi, logoutApi, registerApi, updateUserInfoApi } from "../../utils/auth";
import Cookies from 'js-cookie';
import { forgotPasswordApi } from "../../utils/Api";

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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }) => {
    const response = await forgotPasswordApi(email);
    return response;
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await logoutApi(Cookies.get("refreshToken"));
    return response;
  }
)

export const getUserInfo = createAsyncThunk(
  "auth/getUser",
  async () => {
    const response = await getUserInfoApi();
    return response;
  }
)

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async ({ name, email, password }) => {
    const response = await updateUserInfoApi(name, email, password);
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
    successUpdateUser: false,
    resetDone: false
  },
  reducers: {
    resetSubmitMessageRequest(state) {
      state.error = "";
      state.successUpdateUser = "";
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state) => {
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
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetDone = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: "",
          email: "",
        }
        Cookies.remove("token");
        Cookies.remove("refreshToken");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
      .addCase(getUserInfo.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserInfo.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        }
        state.successUpdateUser = action.payload.success;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
  }
});

export default authSlice.reducer;

export const { resetSubmitMessageRequest } = authSlice.actions;