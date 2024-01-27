import { apiSlice } from "./apiSlice";

const USER_URL='/api/user'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        getProfile:builder.mutation({
            query:()=>({
                url:`${USER_URL}/profile`,
                method:'GET'
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/register`,
                method:'POST',
                body:data
            })
        }),
        getCampaigns:builder.mutation({
            query:()=>({
                url:`${USER_URL}/get-campaigns`,
                method:'GET'
             
            })
        }),
        sendOTP:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/send-otp`,
                method:'POST',
                body:data
            })
        }),
        changePassword:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/forgot-password`,
                method:'PATCH',
                body:data
            })
        }),
        verifyOTP:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/verify-otp`,
                method:'POST',
                body:data
            })
        })
        ,
        createAdvanced:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/create_advanced`,
                method:'POST',
                body:data
            })
        })
        
        ,
        createBasics:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/create_basics`,
                method:'POST',
                body:data
            })
        })
        ,
        createCampaign:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/create-campaign`,
                method:'POST',
                body:data
            })
        }),
        createReward:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/create-reward`,
                method:'POST',
                body:data
            })
        }),
        getCampaign:builder.mutation({
            query:(campaignId)=>({
                url:`${USER_URL}/campaign/${campaignId}`,
                method:'GET'
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST'
            })
        })
    })
})


export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,
    useChangePasswordMutation,
    useCreateCampaignMutation,
    useGetProfileMutation,
    useGetCampaignsMutation,
    useCreateBasicsMutation,
    useCreateAdvancedMutation,
    useCreateRewardMutation,
    useGetCampaignMutation
} = usersApiSlice