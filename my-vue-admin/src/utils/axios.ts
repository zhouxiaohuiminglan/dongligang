import axios,{AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/store/auth';
import router from '@/router'
const service:AxiosInstance  = axios.create({
    baseURL:'/api',
    timeout:5000,
});

//请求拦截器
service.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    let useStore = useUserStore();
    if (useStore.token) {
        config.headers['token'] = useStore.token
    }
    return config;
},(err:AxiosError)=>{
    ElNotification({
        title: 'Error',
        message:err.message,
        type: 'error',
    })
    return Promise.reject(err);
});

//响应拦截器

service.interceptors.response.use((response:AxiosResponse)=>{
    let resData =  response.data;
    if(resData.code != 200){
        ElNotification({
                title: 'Error',
                message:resData.message,
                type: 'error',
            })
        if(resData.code === 603) {
            let {clearInfo} = useUserStore();
            //603表示token失效
            clearInfo()
            router.push('/login')
        }  
    }
    return resData;
},(err:AxiosError)=>{
    ElNotification({
        title: 'Error',
        message:err.message,
        type: 'error',
    })
    return Promise.reject(err);
});

export default service