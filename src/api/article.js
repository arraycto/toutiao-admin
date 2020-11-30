//把封装的request加载进来,把文章列表数据统一设置在article.js字段里面 便于项目维护
import request from '@/utils/request.js'

export const getArticles = params =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/articles',
        //body参数使用data设置
        //Query参数使用params设置
        //Headers参数使用headers设置
        params
    })
} 