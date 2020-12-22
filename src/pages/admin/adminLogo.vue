<template>
  <div class="admin_logo">
    <div class="logo_box">
      <img :src="url" alt="" />
      <img src="../../assets/public/uploadImg.png" alt="" />
      <input type="file" class="logo_file" @change="getFile" ref="logo" />
      <span @click="deleLogo">删除</span>
    </div>
    <button class="submit" @click="uploadLogo">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/metrics/logo",
      logoFile: "",
    };
  },
  mounted() {
    let url = this.$url.replace("/download/", "");
    this.url = url + this.url;
  },
  methods: {
    getFile() {
      this.logoFile = this.$refs.logo.files[0];
      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.logoFile);
      fileExample.onload = (ev) => {
        this.url = ev.target.result;
      };
    },
    uploadLogo() {
      let fromData = new window.FormData();
      fromData.append("file", this.logoFile);
      this.upload.post("/upload", fromData).then((res) => {
        this.axios
          .post("/settings/logo", {
            path: res.data,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.logoFile = "";
              this.$Message.warning("更改成功!");
            } else {
              this.$Message.error(res.msg);
            }
          });
      });
    },
    deleLogo() {
      this.axios
        .delete("/settings/logo")
        .then(() => {
          let url = this.$url.replace("/download/", "");
          this.url = url + "/metrics/logo";
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
  },
};
</script>

<style lang="scss">
.admin_logo {
  .logo_box {
    width: 500px;
    height: 500px;
    margin: 70px auto;
    position: relative;
    img {
      position: absolute;
      max-width: 500px;
      max-height: 500px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .logo_file {
      position: absolute;
      opacity: 0;
      z-index: 99;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 48px;
      height: 40px;
    }
    span {
      position: absolute;
      color: red;
      bottom: 0;
      right: 0;
      cursor: pointer;
    }
  }
  .submit {
    margin: auto auto;
    width: 300px;
  }
}
</style>
