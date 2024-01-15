import { apiSlice } from "./apiSlice";


const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        adminlogin:builder.mutation({
            query:(data) =>({
                url:`${ADMIN_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        adminlogout:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/logout`,
                method:'POST'
            })
        }),
        admingetusers:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/getusers`,
                method:'GET'
            })
        }),
        verifyCampaign:builder.mutation({
            query:(id)=>({
                url:`${ADMIN_URL}/verify-campaign`,
                method:'PATCH',
                body:id
            })
        }),
        getCampaignAdmin:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/get-campaigns`,
                method:'GET'
               
            })
        }),
        blockuser:builder.mutation({
            query:(email)=>({
                url:`${ADMIN_URL}/blockuser?email=${email}`,
                method:'PATCH'
            })
        })
    })
})

export const {
    useAdminloginMutation,
    useAdminlogoutMutation,
    useAdmingetusersMutation,
    useBlockuserMutation,
    useVerifyCampaignMutation,
    useGetCampaignAdminMutation
} = adminApiSlice