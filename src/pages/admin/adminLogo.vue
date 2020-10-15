<template>
<div>
<input type="file" ref="fileId" @change="getFile" />
<button @click="importRow">11111111111</button>
</div>
  
</template>

<script>
export default {
  data() {
    return {
   
      xlsxFile: "",
    };
  },
  methods: {
    getFile() {
      //获取file内容
      let files = this.$refs.fileId.files[0];
      this.xlsxFile = files;
      console.log(this.xlsxFile);
    },
    //上传文件
    importRow() {
      let that = this;
      if (that.xlsxFile == "") {
        that.$message.error("请先添加文件");
        return;
      }
   
      let formData = new window.FormData();
      formData.append("file", that.xlsxFile);
     
      this.axios.post('/upload',formData).then(res=>{
        console.log(res);
      })
     
    },
  },
};
</script>