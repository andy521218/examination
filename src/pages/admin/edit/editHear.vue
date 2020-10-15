<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">添加闻诊-{{ hearData.gender ? "女" : "男" }}</span>
      <span class="edit_switch" @click="editResult()"></span>
    </div>
    <ul class="edit_class">
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">检查项:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-if="!hearData.id"
          placeholder="请输入检查项"
          v-model="name"
        />
        <span class="edit_text_i" v-else>{{ hearData.name }}</span>
        <p class="edit_tips">{{ tipsName }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断结果:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-if="!hearData.id"
          placeholder="请输入诊断结果"
          v-model="options"
        />
        <span class="edit_text_i" v-else>{{ hearData.options[0] }}</span>
        <p class="edit_tips">{{ tipsOptions }}</p>
      </li>
      <li class="relative">
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">闻诊音频:</span>
        </div>
        <input type="text" id="fileName" v-model="fileValue" disabled />
        <input type="file" id="file" ref="file" @change="changVal" />
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel" @click="editResult()">取消</button>
      <button class="edit_submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-hear",
  props: ["hearData"],
  data() {
    return {
      fileValue: "",
      data: "",
      name: "",
      tipsName: "",
      options: "",
      tipsOptions: "",
    };
  },
  methods: {
    editResult() {
      this.$parent.show = false;
    },
    changVal() {
      this.fileValue = this.$refs.file.value;
    },
    submit() {
      if (!this.hearData.id) {
        if (!this.name) {
          return (this.tipsName = "请输入诊断项");
        }
        this.tipsName = "";
        if (!this.options) {
          return (this.tipsOptions = "请输入诊断结果");
        }
        this.tipsOptions = "";
        this.http
          .post(
            "/meta/listen",
            JSON.stringify({
              gender: this.gender,
              name: this.name,
              options: [this.options],
              videoUrl: "",
            }),
          )
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("添加成功!");
              this.$emit("getData");
              this.$parent.show = false;
            } else {
              this.$Message.error("请稍后再试!");
            }
          });
      }
      // var formData = new FileReader();
      // formData.readAsDataURL(this.$refs.file.files[0]);
      // formData.onload = () => {
      //   this.data = formData.result;
      // };
      // console.log(this.data);
      // formData.onloadend = () => {
      //   var data = this.data;
      //   this.axios
      //     .post(
      //       "/upload",
      //       { data },
      //       {
      //         headers: { "Content-Type": "application/octet-stream" },
      //       }
      //     )
      //     .then((res) => {
      //       console.log(res);
      //     });
      // };
    },
  },
};
</script>
<style lang="scss">
#file {
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 32px;
  margin-left: 20px;
  position: relative;
  outline: none;
  overflow: hidden;
  &::after {
    content: "选择";
    position: absolute;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(0, 235, 255);
    left: 0;
    border-radius: 3px;
  }
}
#fileName {
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border: none;
  width: 165px;
  padding-left: 15px;
}
</style>