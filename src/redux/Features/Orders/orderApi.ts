
import { baseApi } from '../../API/baseApi';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createProduct: builder.mutation({
    //   query: (formData) => ({
    //     url: "/product/create",
    //     method: "POST",
    //     body: formData,
    //   }),
    //   invalidatesTags: ["products"]
    // }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/order/all",
        method: "GET",
      }),
      providesTags: ["orders"]
    }),

    // getSingleProductById: builder.query({
    //   query: (id) => ({
    //     url: `/product/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["products"]
    // }),

    // editProduct: builder.mutation({
    //   query: ({ id, formData }) => {
    //     return {
    //       url: `/product/${id}`,
    //       method: "PUT",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["products"],
    // }),

    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `/product/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["products"]
    // }),


  }),
});

export const {
  useGetAllOrdersQuery,
} = orderApi;
