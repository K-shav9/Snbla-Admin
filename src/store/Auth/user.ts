import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  error: string | null;
};

export const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

const slice = createSlice({
  name: "Auth",
  initialState: initialAuthState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    registerFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    storeMyProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

const { reducer } = slice;

export const {
  loginSuccess,
  loginFailed,
  registerSuccess,
  registerFailed,
  storeMyProfile,
  logout,
} = slice.actions;

export default reducer;
