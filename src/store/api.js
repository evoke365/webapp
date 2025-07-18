import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RESOURCE_API, AUTH_API } from '../config';

// Create RTK Query API for resources
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: RESOURCE_API,
  }),
  tagTypes: ['User', 'Note'],
  endpoints: (builder) => ({
    // Get all notes for a user
    getNotes: builder.query({
      query: (token) => `/notes/${token}`,
      providesTags: ['Note'],
    }),
    // Create a new note
    submitNote: builder.mutation({
      query: ({ token, title, body }) => ({
        url: '/note',
        method: 'POST',
        body: {
          token,
          title,
          body,
        },
      }),
      invalidatesTags: ['Note'],
    }),
    // Update note importance
    markNote: builder.mutation({
      query: ({ noteId, token, important }) => ({
        url: '/note',
        method: 'PUT',
        body: {
          id: noteId,
          token,
          important,
        },
      }),
      invalidatesTags: ['Note'],
    }),
    // Delete a note
    deleteNote: builder.mutation({
      query: ({ token, noteId }) => ({
        url: '/note',
        method: 'DELETE',
        body: {
          token,
          noteId,
        },
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useSubmitNoteMutation,
  useMarkNoteMutation,
  useDeleteNoteMutation,
} = api;

// Auth API
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API,
  }),
  tagTypes: ['Auth'],
  endpoints: () => ({}),
});