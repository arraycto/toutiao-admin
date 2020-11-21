import axios from 'axios'




//基于axios封装请求模块 
//创建axios实列，复制一个axios
const request = axios.create({
    //请求跟路径
    baseURL: 'http://ttapi.research.itcast.cn/',
    timeout: 7000
})

export default request 