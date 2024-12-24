import { baseApi } from "../../API/baseApi";



const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/allUsers",
        method: "GET",
      }),
      providesTags: ["users"]
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    logout: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    

  }),
});

export const { useGetAllUsersQuery, useLoginMutation, useLogoutQuery } = authApi;
