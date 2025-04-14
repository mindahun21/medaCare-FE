import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
}

const initialState: AuthState = {
  token: null,
  email: null,
  loading: false,
  error: null,
  isVerified: false,
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export const { logout, setEmail, setToken, setVerified } = authSlice.actions;
export default authSlice.reducer;
