import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonServerApi = createApi({
    reducerPath: 'jsonServerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://mern-library-management-system.onrender.com/api/v1/' }),
    endpoints: (builder) => ({
        getAlbums: builder.query({
            query: (page = 1) => `books/search?title=&genre=&minPrice=10&maxPrice=&sort=&page=${page}`,
        }),
    }),
});

export const { useGetAlbumsQuery } = jsonServerApi;
