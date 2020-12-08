<template>
  <div class="message_private scrollbar">
    <div class="private_left">
      <div class="private_left_header">
        <button class="dele">批量删除</button>
      </div>
      <div class="private_left_cont">
        <ul class="dialogue edit_class">
          <li
            v-for="(item, index) in messagelist"
            :key="index"
            @click="seetopic(item)"
          >
            <input type="checkbox" />
            <div class="user_img">
              <div class="border"></div>
              <img :src="item.avatar" alt v-if="item.avatar" />
              <img src="../../assets/img/home/user.png" alt="" v-else />
              <span>{{ item.name }}</span>
            </div>
            <div class="private_title">
              <span>{{ item.message }}</span>
              <p>{{ item.time | lastTime(item.time) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="private_right">
      <div class="private_right_header">
        <span>{{ name }}</span>
      </div>
      <div class="private_right_cont">
        <ul ref="scroll">
          <li
            :class="{ active: item.userId == checkId }"
            v-for="(item, index) in dialogue"
            :key="index"
          >
            <div class="private_right_left" v-if="item.userId != checkId">
              <img :src="item.avatar" alt v-if="item.avatar" />
              <img src="../../assets/img/home/user.png" v-else />
              <div class="frame">
                <span>{{ item.message }}</span>
                <div></div>
              </div>
            </div>
            <div class="private_right_right" v-if="item.userId == checkId">
              <div class="frame">
                <span>{{ item.message }}</span>
                <div></div>
              </div>
              <img :src="item.avatar" alt v-if="item.avatar" />
              <img src="../../assets/img/home/user.png" v-else />
            </div>
          </li>
        </ul>
        <div class="private_right_bottom">
          <textarea v-model="message"></textarea>
          <button class="submit" @click="submit">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message-private",
  data() {
    return {
      imgUrl: "../../assets/img/home/user.png",
      messagelist: "",
      dialogue: "",
      name: "",
      userId: "",
      message: "",
      id: "",
      checkId: "",
    };
  },
  mounted() {
    this.checkId = localStorage.getItem("userId");
    this.getIm();
    //此Id发送私信获得
    let userId = this.$route.params.userId;
    if (!userId) {
      this.userId = "";
    } else {
      this.userId = userId;
    }
    //此id消息回复获得
    let topicId = this.$route.params.topicId;
    if (!topicId) return;
    this.userId = userId;
    this.id = topicId;
    this.getImid(topicId);
  },
  methods: {
    //获取对话列表
    getIm() {
      this.axios.get("/im").then((res) => {
        this.messagelist = res.data;
      });
    },
    //获取聊天信息列表
    getImid(id) {
      this.axios.get(`/im/${id}`).then((res) => {
        this.dialogue = res.data;
      });
    },
    //发送聊天信息
    submit() {
      this.axios
        .post(`/im`, {
          userId: this.userId,
          message: this.message,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.getImid(this.id);
            this.message = "";
            setTimeout(() => {
              this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
            }, 1000);
          }
        });
    },
    //查看聊天对话框信息
    seetopic(item) {
      this.userId = item.userId;
      this.id = item.id;
      this.name = item.name;
      this.getImid(item.id);
    },
  },
};
</script>

<style lang="scss">
.message_private {
  height: 100%;
  display: flex;
  .private_left {
    width: 40%;
    margin-left: 5px;
    margin-top: 30px;
    height: 93%;
    border-right: 1px solid rgb(0, 235, 255);
    .private_left_header {
      width: 98%;
      height: 65px;
      border-bottom: 1px solid rgb(0, 235, 255);
      .dele {
        margin-left: 7px;
      }
    }
    .private_left_cont {
      width: 97%;
      height: 88%;
      margin-top: 20px;
      margin-left: 1%;
      overflow-y: auto;
      ul {
        li {
          width: 98%;
          height: 100px;
          margin-top: 10px;
          background: rgb(26, 127, 195, 0.2);
          display: flex;
          input {
            width: 22px;
            height: 22px;
            margin-left: 25px;
            margin-top: 30px;
          }
          .user_img {
            width: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 5px;
            position: relative;
            img {
              margin-top: 10px;
              margin-bottom: 10px;
              width: 50px;
              height: 50px;
            }
            span {
              font-size: 12px;
            }
          }
          .private_title {
            width: 480px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              padding-left: 15px;
              width: 365px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        li:hover {
          background: rgb(17, 106, 172);
        }
      }
    }
  }
  .private_right {
    width: 58%;
    height: 93%;
    margin: 0 auto;
    margin-top: 30px;
    border: 1px solid rgb(0, 235, 255);
    .private_right_header {
      width: 98%;
      height: 65px;
      margin: 0 auto;
      padding-left: 10px;
      border-bottom: 1px solid rgb(0, 235, 255);
      span {
        line-height: 65px;
        font-size: 18px;
      }
    }
    .private_right_cont {
      width: 98%;
      height: 88%;
      margin: 10px auto;
      ul {
        height: 88%;
        overflow-y: auto;
        li {
          width: 98%;
          display: flex;
          margin-top: 10px;
          color: rgb(0, 0, 0);
          .private_right_left {
            display: flex;
            img {
              max-width: 55px;
              max-height: 55px;
            }
            .frame {
              position: relative;
              min-width: 88px;
              min-height: 55px;
              background: rgb(255, 255, 255);
              border-radius: 10px;
              margin-left: 20px;
              padding: 15px;
              span {
                display: inline-block;
                max-width: 410px;
              }
              div {
                width: 15px;
                height: 15px;
                position: absolute;
                z-index: 99;
                left: -7px;
                top: 20px;
                transform: rotate(-45deg);
                background: rgb(255, 255, 255);
              }
            }
          }
          .private_right_right {
            display: flex;
            img {
              max-width: 55px;
              max-height: 55px;
            }
            .frame {
              position: relative;
              min-width: 88px;
              min-height: 55px;
              background: rgb(0, 235, 255);
              border-radius: 10px;
              margin-right: 20px;
              padding: 15px;
              span {
                display: inline-block;
                max-width: 410px;
              }
              div {
                width: 15px;
                height: 15px;
                position: absolute;
                z-index: 99;
                right: -7px;
                top: 20px;
                transform: rotate(-45deg);
                background: rgb(0, 235, 255);
              }
            }
          }
        }
        .active {
          justify-content: flex-end;
        }
      }
      .private_right_bottom {
        width: 100%;
        height: 10%;
        margin-top: 1%;
        display: flex;

        textarea {
          width: 88%;
          height: 100%;
          margin-left: 1%;
          margin-right: 1.5%;
          background: rgb(26, 127, 195, 0.2);
          color: rgb(255, 255, 255);
          padding: 1%;
        }
        .submit {
          width: 85px;
          height: 40px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>