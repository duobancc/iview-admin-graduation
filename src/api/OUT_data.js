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