<template>
  <div>
    <input type="file" ref="fileId" @change="getFile" />
    <button @click="importRow">11111111111</button>
    <img
      src="http://59.110.218.110:8080/api/download/C4/1602844813327.png"
      alt=""
    />
    <button @click="fn">getget</button>
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
      this.axios.get("/download/C4/1602844813327.png").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>