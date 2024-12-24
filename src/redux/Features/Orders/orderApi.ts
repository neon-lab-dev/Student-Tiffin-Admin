
import { baseApi } from '../../API/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllOrders: builder.query({
      query: () => ({
        url: "/subscription/all",
        method: "GET",
      }),
      providesTags: ["orders"]
    }),


  }),
});

export const {
  useGetAllOrdersQuery,
} = orderApi;
