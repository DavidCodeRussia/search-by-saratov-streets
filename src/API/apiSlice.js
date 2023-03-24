import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Если что, это отдельный (второй) АПИ на другой URL.
export const addressApiSlice = createApi({
  reducerPath: "addressApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bukharev.digital/sed/place/" }),
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: (address) => `?value=${address}`,
    }),
  }),
});

export const { useLazyGetAddressQuery } = addressApiSlice;
