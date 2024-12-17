import { BaseQueryFn, createApi, FetchBaseQueryError, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://student-tiffin-backend.vercel.app/api/v1',
    credentials: 'include',
  });

  const result = await rawBaseQuery(args, api, extraOptions);

 
  if (result.error) {
    return {
      error: {
        status: result.error.status,
        data: result.error.data || 'Something went wrong!',
      } as FetchBaseQueryError,
    };
  }

  
  return {
    data: result.data,
  };
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['users', 'products', 'orders'],
  endpoints: () => ({}),
});
