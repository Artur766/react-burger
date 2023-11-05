import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfoApi, loginApi, logoutApi, registerApi, updateUserInfoApi } from "../../utils/auth";
import Cookies from 'js-cookie';
import { forgotPasswordApi } from "../../utils/Api";
import { IUser } from "../../utils/types";


export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name }: IUser) => {
    const response = await registerApi({ email, password, name });
    return response;
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: IUser) => {
    const response = await loginApi({ email, password });
    return response;
  }
)

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: IUser) => {
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

export const getUserInfo = createAsyncThunk("auth/getUser", getUserInfoApi);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async ({ name, email, password }: IUser) => {
    const response = await updateUserInfoApi({ name, email, password });
    return response;
  }
)

const initialState = {
  user: {
    name: "",
    email: "",

  },
  loading: false,
  error: "",
  successUpdateUser: false,
  resetDone: false,
  isLoggedIn: false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSubmitMessageRequest(state) {
      state.error = "";
      state.successUpdateUser = false;
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
        if (action.payload && action.payload.user) {
          const { name, email } = action.payload.user;
          state.user = {
            name: name || "",
            email,
          };
          state.isLoggedIn = true;
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
        if (action.payload && action.payload.user) {
          const { name, email } = action.payload.user;
          state.user = {
            name: name || "",
            email,
          };
          state.isLoggedIn = true;
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
        state.isLoggedIn = false;
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
          name: (action.payload as { user: { name: string } }).user.name,
          email: (action.payload as { user: { email: string } }).user.email,
        }
        state.isLoggedIn = true;
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
          name: (action.payload as { user: { name: string } }).user.name,
          email: (action.payload as { user: { email: string } }).user.email,
        }
        state.successUpdateUser = (action.payload as { success: boolean }).success;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      })
  }
});

export default authSlice.reducer;

export const { resetSubmitMessageRequest } = authSlice.actions;