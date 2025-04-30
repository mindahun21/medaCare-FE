import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user';
import { requestUser } from '../features/dashboard/services/user';
import { RootState } from './store';

// Define a type for the auth state
interface AuthState {
  user: User | null;
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  isVerified: boolean;
  expiresAt: number | null;
}

// Load initial token from localStorage
const persistedAuth = localStorage.getItem('auth');
const parsedAuth = persistedAuth ? JSON.parse(persistedAuth) : null;
const initialState: AuthState = {
  user: null,
  token: parsedAuth?.token || null,
  email: null,
  loading: false,
  error: null,
  isVerified: false,
  expiresAt: parsedAuth?.expiresAt || null,
};

// Thunk to load user data
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestUser();
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

export const initializeAuth = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('auth/initializeAuth', async (_, { dispatch, getState }) => {
  const { token } = getState().auth;
  if (token) {
    await dispatch(fetchUser());
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.user = null;
      state.isVerified = false;
      state.expiresAt = null;
      localStorage.removeItem('auth');
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
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: action.payload.token,
          expiresAt: action.payload.expiresAt,
        })
      );
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
        localStorage.removeItem('auth');
      });
  },
});

export const { logout, setEmail, setToken, setVerified, setUser } =
  authSlice.actions;
export default authSlice.reducer;
