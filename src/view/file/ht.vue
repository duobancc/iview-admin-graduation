<template>
    <el-upload
  class="upload-demo"
  name="excel"
  action="http://localhost/index.php/bases/basedata/excel"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      }
    }
  }
</script>