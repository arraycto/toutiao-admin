import request from '@/utils/request'




export const getUserProfile = () =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/user/profile',
        headers:{
            Authorization:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Mzc5MTEzMDYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.lFSVCupW7yN8b1xNA8ogqL8AGP_12NUYbdxZ6LOISSs'
        }
       
    })
}