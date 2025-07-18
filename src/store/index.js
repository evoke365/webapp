import { configureStore } from '@reduxjs/toolkit';
import { reducer as burgerMenu } from 'redux-burger-menu';
import { clearState } from '../localStorage';
import { api, authApi } from './api';
import authReducer from './authSlice';

// Root reducer with logout handling
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    clearState();
    state = undefined;
  }
  
  return {
    auth: authReducer(state?.auth, action),
    burgerMenu: burgerMenu(state?.burgerMenu, action),
    [api.reducerPath]: api.reducer(state?.[api.reducerPath], action),
    [authApi.reducerPath]: authApi.reducer(state?.[authApi.reducerPath], action),
  };
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
    .concat(api.middleware)
    .concat(authApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});