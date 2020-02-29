<template>
<el-upload
  name="excel"
  :data="data"
  accept=".xls, .xlsx,.jpg"
  class="upload-demo"
  ref="upload"
  action="http://localhost/index.php/bases/basedata/excel"
  :on-success="uploadSuccess"
  :on-change="handleChange"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
</el-upload>
</template>

<script>
import {excelUpLoad} from '@/api/file'
  export default {
    data() {
      return {
        data:{
          name:'小陈',
          time:'2020.2.29'
        },
        fileList: []
      };
    },
    methods: {
       submitUpload() {
        this.$refs.upload.submit();
        //this.uploadSuccess(res,file,fileList);
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadSuccess(res,file,fileList){
        console.log(res.data);
        console.log(fileList);
      }
    }
  }
</script>