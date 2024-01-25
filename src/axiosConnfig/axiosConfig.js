import axios from 'axios';
import store from '../store/store';
import loader, { changeLoader } from '../store/slices/loader';

const axiosInstance= axios.create({
    baseURL:'https://dummyjson.com/'
})

export const cancel= axios.CancelToken.source();

axiosInstance.interceptors.request.use((config)=>{
    store.dispatch(changeLoader(true))
    return config
},(err)=>{
    return Promise.reject(err)
})

axiosInstance.interceptors.response.use((res)=>{
    store.dispatch(changeLoader(true))
    return res
},(err)=>{
    return Promise.reject(err)
})

export default axiosInstance;