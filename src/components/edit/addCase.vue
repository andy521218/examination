<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">新增案例</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">姓名:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入姓名"
            v-model="upData.name"
            @change="changeName"
          />
          <p class="edit_tips">{{ nameText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">性别:</span>
          </div>
          <input
            class="edit_radio"
            type="radio"
            value="false"
            name="sex"
            v-model="gender"
          />
          <label for class="edit_off">女</label>
          <input
            class="edit_radio"
            type="radio"
            value="true"
            name="sex"
            v-model="gender"
          />
          <label for class="edit_off">男</label>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年龄:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入年龄"
            v-model="upData.age"
            @change="changeAge"
          />
          <p class="edit_tips">{{ ageText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">病系:</span>
          </div>
          <select
            class="select"
            v-model="upData.diseaseType"
            @change="changeType"
          >
            <option :value="selected">请选择病系</option>
            <option v-for="(item, index) in list" :key="index" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <p class="edit_tips">{{ diseaseTypeText }}</p>
        </li>
        <li class="upload_logo">
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">头像:</span>
          </div>
          <div class="upload_logo_main">
            <div class="upload_logo_main_border">
              <img
                class="itps_logo"
                src="../../assets/public/uploadImg.png"
                alt=""
              />
              <input type="file" ref="logo" @change="uploadImg" />
              <img v-show="imgUrl" class="preview_logo" :src="imgUrl" alt="" />
            </div>
          </div>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-case",
  props: ["list"],
  data() {
    return {
      upData: {},
      selected: undefined,
      gender: "false",
      nameText: "",
      ageText: "",
      diseaseTypeText: "",
      fileLogo: "",
      imgUrl: "",
    };
  },
  methods: {
    close() {
      this.upData = {};
      this.$parent.addCase = false;
      this.$parent.mask = false;
    },
    changeName() {
      if (!this.upData.name) {
        this.nameText = "请输入姓名";
        return false;
      }
      this.nameText = "";
      return true;
    },
    changeAge() {
      if (!this.upData.age) {
        this.ageText = "请输入年龄";
        return false;
      }
      if (!/^\d{0,2}$/.test(this.upData.age)) {
        this.ageText = "请输入1到2位数字";
        return false;
      }
      this.ageText = "";
      return true;
    },
    changeType() {
      if (!this.upData.diseaseType) {
        this.diseaseTypeText = "请选择病系";
        return false;
      }
      this.diseaseTypeText = "";
      return true;
    },
    uploadImg() {
      this.fileLogo = this.$refs.logo.files[0];
      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.fileLogo);
      fileExample.onload = (ev) => {
        this.imgUrl = ev.target.result;
      };
    },
    submit() {
      if (this.changeName() && this.changeAge() && this.changeType()) {
        if (!this.fileLogo) {
          this.$Message.error("请上传头像!");
          return;
        }
        let formData = new window.FormData();
        formData.append("file", this.fileLogo);
        this.upload.post("/upload", formData).then((res) => {
          if (res.code == "000000") {
            this.http
              .post("/case/manage", {
                name: this.upData.name,
                age: this.upData.age,
                diseaseType: this.upData.diseaseType,
                gender: this.gender,
                picUrl: res.data,
              })
              .then((res) => {
                if (res.code == "000000") {
                  localStorage.setItem("caseId", res.data);
                  this.$router.push("/case");
                } else {
                  this.$Message.error(res.msg);
                }
              });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss">
.upload_logo {
  display: flex;
  .upload_logo_main {
    width: 265px;
    height: 228px;
    position: relative;
    .upload_logo_main_border {
      width: 100%;
      height: 100%;
      border: rgb(9, 124, 168) 1px solid;
      text-align: center;
      .itps_logo {
        margin-top: 94px;
      }
      input {
        opacity: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .preview_logo {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -99;
      }
    }
  }
}
</style>