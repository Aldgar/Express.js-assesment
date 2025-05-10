import { configureStore } from '@reduxjs/toolkit';
import { gqlApi } from './api/gqlApi';
import authReducer from './features/auth/authSlice'; // Assuming you have an auth slice

export const store = configureStore({
  reducer: {
    [gqlApi.reducerPath]: gqlApi.reducer,
    auth: authReducer, // Add your auth reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gqlApi.middleware),
});