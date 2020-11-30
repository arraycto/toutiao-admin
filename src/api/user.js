import request from '@/utils/request'




export const getUserProfile = () =>{
    
    
    return request({
        method:'GET',
        url:'/mp/v1_0/user/profile'
       
    })
}