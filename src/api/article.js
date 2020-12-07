//把封装的request加载进来,把文章列表数据统一设置在article.js字段里面 便于项目维护
import request from '@/utils/request.js'

//封装获取文章里列表的请求方法
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

//封装获取频道列表的请求方法
export const getArticlesChanels = () =>{
    return request({
        method:'GET',
        url:'/mp/v1_0/channels'
    })
}

//封装删除文章的请求方法 
export const deleteArticle = articleId =>{
    return request({
        method:'DELETE',
        //接口文档中写的路径参数需要在url中传递 用es6字符串拼接的方法
        url:`/mp/v1_0/articles/${articleId}`
        
    })
}

//添加文章封装请求方法
export const addArticle = (data, draft = false) =>{
    return request({
        method:'POST',
        url:'/mp/v1_0/articles',
        params:{
            draft//是否存入草稿ture就是草稿
        },
        data
    })
}
//编辑文章 修改文章
export const updataArticle = (articleId, data, draft = false) =>{
    return request({
        method:'PUT',
        url:`/mp/v1_0/articles/${articleId}`,
        params:{
            draft
        },
        data
    })
}

//获取指定文章
export const getArticle = articleId =>{
    return request({
        method:'GET',
        url:`/mp/v1_0/articles/${articleId}`
        
    })
}
