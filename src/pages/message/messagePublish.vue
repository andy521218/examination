<template>
  <div class="message_publish">
    <div class="publish_select">
      <label for>分类</label>
      <select name id class="select" v-model="diseaseType">
        <option value>请选择病系</option>
        <option :value="item.id" v-for="(item, index) in list" :key="index">
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="publish_text">
      <label for>标题</label>
      <input
        type="text"
        placeholder="请输入问题标题..."
        maxlength="30"
        class="text_box"
        v-model="title"
      />
      <span>{{ title.length }}/30</span>
    </div>
    <div class="publish_area">
      <label for>内容</label>
      <textarea
        placeholder="请输入问题内容..."
        v-model="message"
        maxlength="130"
      ></textarea>
      <span>{{ message.length }}/130</span>
    </div>
    <div class="input_file">
      <input
        type="file"
        accept="image/*"
        multiple
        @change="uploadImgs"
        ref="imgs"
      />
      <p>+</p>
    </div>
    <button class="submit" @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: "message-publish",
  data() {
    return {
      message: "",
      title: "",
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
      diseaseType: "",
      file: "",
    };
  },
  methods: {
    submit() {
      if (!this.diseaseType) {
        this.$Message.error("请选择病系");
        return;
      }
      if (!this.title) {
        this.$Message.error("请输入标题");
        return;
      }
      if (this.file.length > 3) {
        this.$Message.error("照片超出上限3张");
        return;
      }
      let formData = new window.FormData();
      let promise = [];
      for (let i = 0; i < this.file.length; i++) {
        promise.push(
          new Promise((resolve) => {
            formData.append("file", this.file[i]);
            this.upload.post("upload", formData).then((res) => {
              return resolve(res.data);
            });
          })
        );
      }
      Promise.all(promise).then((res) => {
        this.http
          .post("/topic", {
            diseaseType: this.diseaseType,
            imgs: res,
            message: this.message,
            title: this.title,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.diseaseType = "";
              this.message = "";
              this.title = "";
              let authority = localStorage.getItem("authority");
              if (authority == "STUDENT") {
                this.$store.state.menuId = 2;
                this.$router.push("/messagemy");
              }
            } else {
              this.$Message.error(res.msg);
            }
          });
      });
    },
    uploadImgs() {
      this.file = this.$refs.imgs.files;
    },
  },
};
</script>

<style lang="scss">
.message_publish {
  width: 940px;
  margin: 45px auto;
  label {
    display: inline-block;
    width: 30px;
    margin-right: 15px;
  }
  .publish_select {
    height: 45px;
    margin-top: 45px;
    .select {
      height: 100%;
      width: 250px;
      background: rgb(3, 145, 240, 0.2);
      option {
        background-color: rgb(5, 61, 118);
      }
    }
  }

  .publish_text {
    height: 45px;
    margin-top: 45px;
    position: relative;
    .text_box {
      width: 890px;
      height: 100%;
      background: rgb(26, 127, 195, 0.2);
    }
    .text_box::placeholder {
      color: rgb(110, 111, 113);
    }
    span {
      position: absolute;
      color: rgb(0, 235, 255);
      right: 20px;
      bottom: 10px;
    }
  }
  .publish_area {
    margin-top: 45px;
    height: auto;
    position: relative;
    display: flex;
    textarea {
      width: 890px;
      height: 295px;
      color: rgb(255, 255, 255);
      background: rgb(26, 127, 195, 0.2);
      padding: 20px;
    }
    span {
      position: absolute;
      color: rgb(0, 235, 255);
      right: 20px;
      bottom: 10px;
    }
  }
  .input_file {
    width: 100px;
    height: 100px;
    margin-left: 815px;
    margin-top: 25px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      outline: none;
      opacity: 0;
      z-index: 99;
      position: absolute;
    }
    p {
      line-height: 100px;
      text-align: center;
      font-size: 50px;
      color: rgb(0, 235, 255);
      width: 100px;
      height: 100px;
      position: absolute;
      border: 1px solid rgb(0, 235, 255);
      background-color: rgb(5, 61, 118);
      top: 0;
      left: 0;
    }
  }
  .submit {
    width: 375px;
    height: 45px;
    margin: 40px auto;
  }
}
</style>