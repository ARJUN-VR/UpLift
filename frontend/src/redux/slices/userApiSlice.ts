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
        getCategory:builder.mutation({
            query:(category)=>({
                url:`${USER_URL}/get-category/${category}`,
                method:'GET'
            })
        }),
        postComment:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/comment`,
                method:'POST',
                body:data
            })
        }),
        listComment:builder.mutation({
            query:(campaignId)=>({
                url:`${USER_URL}/comment/:${campaignId}`,
                method:'GET'
           
            })
        }),
        getReward:builder.mutation({
            query:(basicId)=>({
                url:`${USER_URL}/reward/${basicId}`,
                method:'GET',
 
           
            })
        }),
        pledge:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/pledge`,
                method:'POST',
                body:data
 
           
            })
        }),
        listCategory:builder.mutation({
            query:()=>({
                url:`${USER_URL}/fetchthedata`,
                method:'GET'
            })
        }),
        getChannelData:builder.mutation({
            query:(email)=>({
                url:`${USER_URL}/channels/${email}`,
                method:'GET'
            })
        }),
        saveChat:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/chat`,
                method:'POST',
                body:data
            })
        }),
        getChat:builder.mutation({
            query:(campaignId)=>({
                url:`${USER_URL}/chat/${campaignId}`,
                method:'GET',
              
            })
        }),
        editProfile:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/profile`,
                method:'PATCH',
                body:data
              
            })
        }),
        getDashboardData:builder.mutation({
            query:(creatorEmail)=>({
                url:`${USER_URL}/dashboard/${creatorEmail}`,
                method:'GET'

              
            })
        }),
        getPaymentData:builder.mutation({
            query:(campaignId)=>({
                url:`${USER_URL}/paymentData/${campaignId}`,
                method:'GET'

              
            })
        }),
        getSearchData:builder.mutation({
            query:()=>({
                url:`${USER_URL}/search`,
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
    useGetCampaignMutation,
    useGetCategoryMutation,
    usePostCommentMutation,
    useListCommentMutation,
    useGetRewardMutation,
    usePledgeMutation,
    useListCategoryMutation,
    useGetChannelDataMutation,
    useSaveChatMutation,
    useGetChatMutation,
    useEditProfileMutation,
    useGetDashboardDataMutation,
    useGetPaymentDataMutation,
    useGetSearchDataMutation
} = usersApiSlice