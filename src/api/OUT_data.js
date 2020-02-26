import axios from '@/libs/api.request'
import qs from 'qs'

// 校外工作量数据 api

export const getXWTableData = () => {
    // 获取校外工作量
    return axios.request({
        url: 'http://localhost/index.php/outside/userinfo/selectXWAll',
        method: 'get'
    })
}

export const getPieData =() =>{
    // 不同学院的校外总工作量比例
    return axios.request({
        url:'http://localhost/index.php/outside/userinfo/pieData',
        method:'get'
    })

}

export const getBarData =() =>{
    // 不同学院的校外总工资支出情况
    return axios.request({
        url:'http://localhost/index.php/outside/userinfo/barData',
        method:'get'
    })

}