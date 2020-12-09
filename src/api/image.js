/*
素材管理
*/

import request from '@/utils/request.js'


/*上传用户突破素材 */
export const uploadImage = data =>{
    return request({
        method:'POST',
        url:'/mp/v1_0/user/images',
        //一般文件上传的接口都要求把请求头中的Content-Type设置为
        //multipart/form-data ，但是我们使用axios上传文件的话不需要
        //手动设置，你只要给data设置一个 new FormData()
        data
    })
} 
