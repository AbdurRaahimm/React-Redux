import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Post'], // To manage cache invalidation
    endpoints: (builder) => ({
        // READ (GET): Fetch all posts
        fetchPosts: builder.query({
            query: () => '/posts',
            providesTags: (result = [], error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Post', id })), { type: 'Post', id: 'LIST' }]
                    : [{ type: 'Post', id: 'LIST' }],

        }),

        // **CREATE** (POST) - Add a new post
        addPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],  // Invalidates the list to refetch
        }),
        // **UPDATE** (PUT) - Update an existing post
        updatePost: builder.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        }),
        // DELETE: Delete a post by ID
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
        }),
    })
});

export const {
    useFetchPostsQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddPostMutation
} = apiSlice;