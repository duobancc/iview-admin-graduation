import axios from '@/libs/api.request'
import qs from 'qs'


// (教师信息)用户数据api


export const getUser = () => {
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/selectCopy',
        method: 'get'
    })
}
export const postUpdateUser = (changdata) => {
    // 修改教师信息
    let newdata = qs.stringify(changdata)
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/UpdateUser',
        method: 'post',
        data: newdata

    })
}

export const UpdateUser = (changdata) => {
    // 修改教师信息
    let newdata = qs.stringify(changdata)
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/UpdateUserInfo',
        method: 'post',
        data: newdata

    })
}

export const AddNewTeacher = (fromdata) => {
    // 添加新教师
    let adddata = qs.stringify(fromdata)
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/adduser',
        method: 'post',
        data: adddata
    })
}

export const getUserInfoData = () => {
    // 获取所有教师信息
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/selectJoin',
        method: 'get'
    })
}
export const deleteUser = (delete_id) => {
    // 删除一位教师
    let t_id = qs.stringify(delete_id)
    return axios.request({
        url: 'http://localhost/index.php/user/Userinfo/deleteUser',
        method: 'post',
        data: t_id
    })
}

// 校内工作量数据 api

export const getXueShiData = () => {
    // 获取信工工作量
    return axios.request({
        url: 'http://localhost/index.php/inside/userinfo/selectXueShiXG',
        method: 'get'
    })
}

// 校外工作量数据 api

export const getXWTableData = () => {
    // 获取校外工作量
    return axios.request({
        url: 'http://localhost/index.php/outside/userinfo/selectXWAll',
        method: 'get'
    })
}

export const getDragList = () => {
    return axios.request({
        url: 'get_drag_list',
        method: 'get'
    })
}

export const errorReq = () => {
    return axios.request({
        url: 'error_url',
        method: 'post'
    })
}

export const saveErrorLogger = info => {
    return axios.request({
        url: 'save_error_logger',
        data: info,
        method: 'post'
    })
}

export const uploadImg = formData => {
    return axios.request({
        url: 'image/upload',
        data: formData
    })
}

export const getOrgData = () => {
    return axios.request({
        url: 'get_org_data',
        method: 'get'
    })
}

export const getTreeSelectData = () => {
    return axios.request({
        url: 'get_tree_select_data',
        method: 'get'
    })
}