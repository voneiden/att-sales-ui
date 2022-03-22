import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  apiToken?: string;
}

const initialState: TokenState = {
  apiToken: undefined,
};

const apiTokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    apiTokenFetched(state, action: PayloadAction<TokenState>) {
      state.apiToken = action.payload.apiToken;
    },
  },
});

export const { apiTokenFetched } = apiTokenSlice.actions;

export default apiTokenSlice.reducer;
