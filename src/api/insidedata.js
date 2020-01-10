import axios from '@/libs/api.request'
import qs from 'qs'

// 校内工作量数据 api

export const getXueShiData = () => {
    // 获取信工工作量
    return axios.request({
        url: 'http://localhost/index.php/inside/userinfo/selectXueShiXG',
        method: 'get'
    })
}