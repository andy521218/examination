<template>
  <div class="user_center">
    <div class="user_top">
      <div class="user_big">
        <div class="user_small">
          <input
            type="file"
            class="uploadlogo"
            @change="uploadlogo"
            ref="logo"
          />
          <img :src="current.avatar" alt="" v-if="current.avatar" />
          <img src="../../assets/public/timg.png" alt v-else />
          <span class="edit">点击修改头像</span>
        </div>
        <!-- <span class="user_number">20200912</span> -->
      </div>
    </div>
    <div class="user_bottom">
      <ul>
        <li>
          <span>姓名:</span>
          <p>{{ current.userName }}</p>
        </li>
        <li>
          <span>班级:</span>
          <p>{{ current.classRoomName }}</p>
        </li>
        <li>
          <span>手机号:</span>
          <input class="text_box" type="text" v-model="current.mobile" />
        </li>
        <li>
          <span>邮箱:</span>
          <input class="text_box" type="text" v-model="current.email" />
        </li>
      </ul>
      <button class="submit" @click="submit">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-center",
  data() {
    return {
      current: {},
    };
  },
  mounted() {
    this.getCurrent();
  },
  methods: {
    getCurrent() {
      this.axios.get("/users/current").then((res) => {
        this.current = res.data;
      });
    },
    uploadlogo() {
      let logo = this.$refs.logo.files[0];
      if (!logo) return;

      let fileExample = new FileReader();
      fileExample.readAsDataURL(logo);
      fileExample.onload = (ev) => {
        this.current.avatar = ev.target.result;
        this.$store.state.avatar = ev.target.result;
      };
      let formData = new window.FormData();
      formData.append("file", logo);
      this.upload.post("/upload", formData).then((res) => {
        let url = this.qs.stringify({
          avatar: `http://localhost:8080/api/download/${res.data}`,
        });
        this.http.put(`/users/avatar?${url}`);
      });
    },
    checkPhone() {
      if (!this.current.mobile) {
        this.$Message.error("手机号码不能为空!");
        return false;
      }
      if (
        !/^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/.test(
          this.current.mobile
        )
      ) {
        this.$Message.error("请填写正确的手机号!");
        return false;
      }
      return true;
    },
    checkEmail() {
      if (!this.current.email) {
        /*eslint-disable*/
        this.$Message.error("请填写邮箱!");
        return false;
      }
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.current.email)) {
        this.$Message.error("请输入正确的邮箱!");
        return false;
      }
      return true;
    },
    submit() {
      if (!this.checkPhone() && !this.checkEmail()) return;
      let updata = this.qs.stringify({
        mobile: this.current.mobile,
        email: this.current.email,
      });
      this.axios.put(`/my/profile?${updata}`).then((res) => {
        if (res.code == "000000") {
          return this.$Message.warning("修改成功!");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.user_center {
  .user_top {
    width: 99%;
    height: 315px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);
    position: relative;
    .user_big {
      width: 215px;
      height: 215px;
      position: absolute;
      top: 50px;
      left: 50%;
      margin-left: -108px;
      border: 1px solid rgb(9, 124, 168);
      border-radius: 50%;
      padding: 5px;
      .user_small {
        width: 100%;
        height: 100%;
        border: 3px solid rgb(32, 85, 127);
        border-radius: 50%;
        .uploadlogo {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
        }
        .edit {
          background: rgb(0, 0, 0, 0) !important;
          position: relative;
          width: 100px;
          bottom: -20px;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user_number {
        width: 200px;
        height: 25px;
        position: relative;
        left: 240px;
        top: -115px;
        font-size: 20px;
      }
    }
  }
  .user_bottom {
    width: 1000px;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        display: flex;
        width: 350px;
        height: 45px;
        line-height: 45px;
        margin-left: 100px;
        margin-top: 70px;
        span {
          margin-right: 10px;
        }
        .text_box {
          width: 275px;
        }
      }
    }
    .submit {
      width: 370px;
      height: 45px;
      line-height: 30px;
      margin: 90px auto;
    }
  }
}
</style>