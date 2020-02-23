import axios from '@/libs/api.request'
import qs from 'qs'

// 校内工作量数据 api

export const getData = (xueyuan) => {
    // 根据参数获取对应部门数据
    return axios.request({
        url: 'http://localhost/index.php/inside/Info/getParms',
        method: 'post',
        data:qs.stringify(xueyuan)
    })
}

export const Delete =(delete_id) => {
    // 删除单条信息
    return axios.request({
        url:'http://localhost/index.php/inside/Info/delete',
        method: 'post',
        data:qs.stringify(delete_id)
    })
}

export const Update =(changedata) => {
    // 修改单条记录
    return axios.request({
        url:'http://localhost/index.php/inside/Info/update',
        method: 'post',
        data:qs.stringify(changedata)
    })
}