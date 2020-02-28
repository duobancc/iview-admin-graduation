import axios from '@/libs/api.request'
import qs from 'qs'


export const excelUpLoad =(formData) =>{
    return axios.request({
        url:'http://localhost/index.php/fileupload/upload/uploads',
        //headers:{'Content-Type':'multipart/form-data'},
        method:'post',
        data:qs.stringify(formData)
       
    })
}