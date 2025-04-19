import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
  expiresAt: number | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  email: null,
  loading: false,
  error: null,
  isVerified: false,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isVerified = false;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (
      state,
      action: PayloadAction<{ token: string; expiresAt: number }>
    ) => {
      state.token = action.payload.token;
      state.expiresAt = action.payload.expiresAt;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export const { logout, setEmail, setToken, setVerified } = authSlice.actions;
export default authSlice.reducer;
