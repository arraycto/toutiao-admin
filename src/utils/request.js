import axios from 'axios'
import JSONbig from 'json-bigint'




//基于axios封装请求模块 
//创建axios实列，复制一个axios
const request = axios.create({
    //请求跟路径
    baseURL: 'http://ttapi.research.itcast.cn',
    //定义后端返回的原始数据处理
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
       try{
         return JSONbig.parse(data)
       }catch(err){
         return data
       }
    }]
})

//请求拦截器
request.interceptors.request.use(
    //所有请求都会经过这里
    //config是当前请求相关的配置信息
    function(config){
        const user = JSON.parse(window.localStorage.getItem('user'))
        //如果有登录用户信息 则同意设置用户信息
        if(user) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    }
)

export default request 