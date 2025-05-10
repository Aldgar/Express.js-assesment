import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

export const gqlApi = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:4000/graphql', // Update to match your backend GraphQL endpoint
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from Redux store
      const token = getState().auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: () => ({
        document: `
          query {
            categories
          }
        `,
      }),
    }),

    // Get all challenges with optional category filter
    getChallenges: builder.query({
      query: ({ category }) => ({
        document: `
          query($category: String) {
            challenges(category: $category) {
              status
              title
              category
              difficulty
              solution_rate
            }
          }
        `,
        variables: { category },
      }),
    }),

    // Get a challenge by ID
    getChallengeById: builder.query({
      query: (id) => ({
        document: `
          query($id: ID!) {
            challenge(id: $id) {
              description
              code
              submission
              tests
            }
          }
        `,
        variables: { id },
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetChallengesQuery,
  useGetChallengeByIdQuery,
} = gqlApi;