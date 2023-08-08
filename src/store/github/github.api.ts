import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GitHubUser, GitHubUserSimple } from '../../interfaces/user'
import { ServerResponse } from '../../interfaces/server-response'

export const githubApi = createApi({
    reducerPath: 'githubApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    endpoints: (builder) => ({
        searchUsers: builder.query<GitHubUser[], string>({
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                },
            }),
            transformResponse: (response: ServerResponse<GitHubUser>) => response.items,
        }),
        getUser: builder.query<GitHubUserSimple, string>({
            query: (username: string) => ({
                url: `users/${username}`,
            }),
            transformResponse: (response: GitHubUserSimple) => ({
                name: response.name,
                login: response.login,
                bio: response.bio,
                avatar_url: response.avatar_url,
                html_url: response.html_url,
            }),
        }),
    }),
})

export const { useLazySearchUsersQuery, useGetUserQuery } = githubApi