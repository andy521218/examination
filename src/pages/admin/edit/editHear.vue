<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title"
        >{{ hearData.id ? "编辑" : "添加" }}闻诊-{{
          hearData.gender ? "女" : "男"
        }}</span
      >
      <span class="edit_switch" @click="editResult()"></span>
    </div>
    <ul class="edit_class">
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">检查项:</span>
        </div>
        <select v-if="!hearData.id" v-model="groupId" class="select">
          <option value="">请选择检查项</option>
          <option
            v-for="(item, index) in groupData"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </select>
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
          v-model="name"
        />
        <span class="edit_text_i" v-else>{{ hearData.results[0].name }}</span>
        <p class="edit_tips">{{ tipsOptions }}</p>
      </li>
      <li class="relative">
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">闻诊音频:</span>
        </div>
        <input type="text" id="fileName" v-model="fileValue" disabled />
        <input type="file" id="file" ref="file" @change="changVal" />
        <p class="edit_tips">{{ tipsFile }}</p>
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
  props: ["hearData", "songId"],
  data() {
    return {
      fileValue: "",
      name: "",
      tipsName: "",
      tipsFile: "",
      tipsOptions: "",
      fileData: "",
      groupData: {},
      groupId: "",
    };
  },
  mounted() {
    this.getGroupdata();
  },
  methods: {
    editResult() {
      this.$parent.show = false;
      this.$parent.hearData = false;
    },
    changVal() {
      this.fileValue = this.$refs.file.value;
      this.fileData = this.$refs.file.files[0];
    },
    getGroupdata() {
      this.axios.get("/meta/listen/group").then((res) => {
        this.groupData = res.data;
      });
    },
    submit() {
      if (!this.hearData.id) {
        if (!this.groupId) {
          return (this.tipsName = "请选择诊断项");
        }
        this.tipsName = "";
        if (!this.name) {
          return (this.tipsOptions = "请输入诊断结果");
        }
        this.tipsOptions = "";
        if (!this.fileData) return (this.tipsFile = "请上传音频");
        this.tipsFile = "";

        let formData = new window.FormData();
        formData.append("file", this.fileData);
        this.upload.post("/upload", formData).then((res) => {
          let url = `http://localhost:8080/api/download/${res.data}`;
          if (res.code == "000000") {
            this.http
              .post(`/meta/listen/${this.groupId}`, {
                gender: this.hearData.gender,
                name: this.name,
                videoUrl: url,
              })
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
        });
      } else {
        this.tipsOptions = "";
        if (!this.fileData) return (this.tipsFile = "请上传音频");
        this.tipsFile = "";

        let formData = new window.FormData();
        formData.append("file", this.fileData);
        this.upload.post("/upload", formData).then((res) => {
          let url = `http://localhost:8080/api/download/${res.data}`;
          if (res.code == "000000") {
            this.http
              .put(`/meta/listen/${this.songId}`, {
                gender: this.hearData.gender,
                name: this.hearData.name,
                videoUrl: url,
              })
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
        });
      }
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