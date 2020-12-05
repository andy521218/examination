<template>
  <div style="text-align: center">
    <h4>LOGO修改</h4>
    <h2>功能待完善</h2>
    <input type="file" ref="fileId" @change="getFile" />
    <button @click="importRow">上传</button>
    <img :src="url" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      xlsxFile: "",
      url:''
    };
  },
  methods: {
    getFile() {
      //获取file内容
      let files = this.$refs.fileId.files[0];
      this.xlsxFile = files;
    },
    //上传文件
    importRow() {
      let that = this;
      if (that.xlsxFile == "") {
        that.$Message.error("请先添加文件");
        return;
      }

      let formData = new window.FormData();
      formData.append("file", that.xlsxFile);
      this.upload.post("/upload", formData).then((res) => {
        console.log(res);
      });
    },
    fn() {
      let obj1 = toString([1]);
      let obj2 = toString([1]);
      console.log(obj1 == obj2);
    },
  },
};
</script>
