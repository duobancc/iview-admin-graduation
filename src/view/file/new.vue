<template>
<div>
        <Upload
    multiple
    ref="upload"
    :before-upload="handleUpload"
    :show-upload-list="false"
    :on-success="uploadSuccess"
    action="//jsonplaceholder.typicode.com/posts/">
    <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
</Upload>
<div v-for="(item, index) in file">Upload file: {{ item.name }} 
    <a href="javascript:;"  @click="delectFile(item.name)">X</a>
    <Button style="margin-left:30px;"
        size="small"
        v-if="index === 0"
![](https://user-gold-cdn.xitu.io/2018/3/14/16223a8c12c38be9?w=649&h=743&f=png&s=55740)
        type="primary"
        @click="upload"
        :loading="loadingStatus">上传</Button>
</div>
</div>
    


</template>
<script>
export default {
    data(){
        return{
             file: [{
                name: 'aaa.jpg',
                type: 'image/jpeg',
                keyID: 123479
            },{
                name: 'bbb.jpg',
                type: 'image/jpeg',
                keyID: 987654
            }], // 总文件List
            uploadFile: [], // 需要上传的文件List
            actionUrl:'http://localhost/index.php/bases/basedata/excel',
            file:null,
            headers:{'Content-Type':'multipart/form-data'},
        }
    },
    methods:{
        handleUpload (file) { // 上传文件前的事件钩子
    // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
    let keyID = Math.random().toString().substr(2);
    file['keyID'] = keyID;
    // 保存文件到总展示文件数据里
    this.file.push(file);
    // 保存文件到需要上传的文件数组里
    this.uploadFile.push(file)
    // 返回 falsa 停止自动上传 我们需要手动上传
    return false;
},
 delectFile (keyID) { // 删除文件
    // 删除总展示文件里的当前文件
    this.file = this.file.filter(item => {
        return item.name != name
    })
    // 删除需要上传文件数据里的当前文件
    this.uploadFile = this.uploadFile.filter(item => {
        return item.KeyID != keyID
    })
}, upload () { // 上传文件
    for (let i = 0; i < this.uploadFile.length; i++) {
        let item = this.file[i]
        this.$refs.upload.post(item);
    }
},uploadSuccess (res, file,fileList) { // 文件上传回调 上传成功后删除待上传文件
    console.log(response)
    console.log(file)
    console.log(fileList)  
},

    }
}
</script>