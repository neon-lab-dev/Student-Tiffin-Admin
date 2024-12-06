
import { baseApi } from '../../API/baseApi';

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"]
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: ["products"]
    }),

    getSingleProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["products"]
    }),

    editProduct: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/product/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["products"],
    }),
    
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"]
    }),


  }),
});

export const { useCreateProductMutation, useGetAllProductsQuery, useGetSingleProductByIdQuery, useEditProductMutation, useDeleteBlogMutation } = productApi;
