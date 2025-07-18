import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './api';

// Define auth endpoints using RTK Query
export const authApiExtended = authApi.injectEndpoints({
  endpoints: (builder) => ({
    validateEmail: builder.query({
      query: (email) => `user/${email}`,
      providesTags: ['Auth'],
    }),
    signupUser: builder.mutation({
      query: (userData) => ({
        url: 'signup',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    verifyUser: builder.mutation({
      query: (verificationData) => ({
        url: 'verify',
        method: 'POST',
        body: verificationData,
      }),
      invalidatesTags: ['Auth'],
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'reset-password',
        method: 'POST',
        body: resetData,
      }),
      invalidatesTags: ['Auth'],
    }),
    googleLogin: builder.mutation({
      query: (googleUserInfo) => ({
        url: 'google-login',
        method: 'POST',
        body: {
          googleToken: googleUserInfo.token,
          email: googleUserInfo.email,
          name: googleUserInfo.name,
          picture: googleUserInfo.picture,
          googleId: googleUserInfo.id,
        },
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useValidateEmailQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useVerifyUserMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} = authApiExtended;

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;