import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClientErrorObject, ClientStatus, ClientStatusId, User } from '../../auth/index';

interface AuthState {
  user: User | undefined;
  status: ClientStatusId;
  authenticated: boolean;
  initialized: boolean;
  error: ClientErrorObject | undefined;
}

interface ConnectedState {
  getStatus: ClientStatusId;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: undefined,
  status: ClientStatus.NONE,
  authenticated: false,
  initialized: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connected(state, action: PayloadAction<ConnectedState>) {
      state.authenticated = action.payload.isAuthenticated;
      state.initialized = action.payload.isInitialized;
      state.status = action.payload.getStatus;
    },
    initializing(state) {
      state.initialized = false;
      state.status = ClientStatus.INITIALIZING;
    },
    authorized(state, action: PayloadAction<User>) {
      state.authenticated = true;
      state.initialized = true;
      state.status = ClientStatus.AUTHORIZED;
      state.user = action.payload;
    },
    unauthorized(state) {
      state.authenticated = false;
      state.initialized = true;
      state.status = ClientStatus.UNAUTHORIZED;
      state.user = undefined;
    },
    tokenExpired(state) {
      state.status = ClientStatus.UNAUTHORIZED;
      state.user = undefined;
    },
    errorThrown(state, action: PayloadAction<ClientErrorObject>) {
      state.error = action.payload;
    },
  },
});

export const { authorized, connected, errorThrown, initializing, tokenExpired, unauthorized } = authSlice.actions;

export default authSlice.reducer;
