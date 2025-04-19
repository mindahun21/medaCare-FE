import { RootState } from '../../data/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.auth.token && state.auth.user);

export const selectUserRole = (state: RootState): string | null =>
  state.auth.user?.role?.name ?? null;

export const selectIsVerified = (state: RootState): boolean =>
  state.auth.user?.verified ?? false;
