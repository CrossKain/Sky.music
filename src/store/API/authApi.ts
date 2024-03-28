import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const authApi = createApi({
    reducerPath: "authApi", 
    baseQuery: fetchBaseQuery({baseUrl: "https://skypro-music-api.skyeng.tech/user/"}),
    endpoints: builder => ({
        login: builder.mutation({
            query: ({email, password}) => ({url: "login/", method: "POST", body: {
                email, password
            }})

            
        }),
        registration: builder.mutation({
            query: ({email, password, username}) => ({url: "signup/", method: "POST", body: {
                email, password, username
            }})
        })    

    })

}) 




export const {useLoginMutation, useRegistrationMutation} = authApi