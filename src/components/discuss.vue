<template>
  <div class="message_forum scrollbar">
    <div class="main_mask" v-show="discuss_show"></div>
    <add-discuss
      v-if="discuss_show"
      :discussData="discussData"
      :messageId="messageId"
      :index="index"
      :privateTopic="privateTopic"
      :textIpts="textIpts"
    ></add-discuss>

    <see-img :url="url" v-show="imgs_show"></see-img>
    <div class="main_header">
      <button
        class="dele"
        v-show="dele || authority == 'TEACHER'"
        @click="deleTopic"
      >
        批量删除
      </button>
      <label for>分类</label>
      <select name id class="select" v-model="diseaseType">
        <option value>请选择病系</option>
        <option :value="item.id" v-for="(item, index) in list" :key="index">
          {{ item.name }}
        </option>
      </select>
      <input
        type="text"
        v-model="keyword"
        class="text_box"
        placeholder="请输入关键词"
      />
      <button class="submit" @click="searchTopic">检索</button>
    </div>
    <div class="main_table">
      <ul class="message_list">
        <!-- 1级问题 -->
        <li
          class="message_item edit_class"
          v-for="(item, index) in topicData"
          :key="index"
        >
          <!-- <div class="load" v-show="notice_top_show == index">
            <span class="load_icon"></span>
            <span class="load_text">展开回复</span>
          </div> -->
          <div class="message_left">
            <input
              type="checkbox"
              v-show="dele || authority == 'TEACHER'"
              v-model="deleCheck"
              :value="item.topicId"
            />
            <div class="message_img">
              <!-- <div class="notice" v-show="notice_show">
                <div class="notice_top">发送私信</div>
                <div class="notice_bottom"></div>
              </div> -->
              <img
                :src="$url + item.userAvatar"
                @click="sendmessage(item)"
                title="发送私信"
              />
              <span>{{ item.name }}</span>
            </div>
            <div class="message_title" @click="replyTwo(item, index)">
              <span>{{ item.title }}</span>
              <span>{{ item.message }}</span>
            </div>
          </div>
          <div class="message_right">
            <img
              v-for="(i, index) in item.imgs"
              :key="index"
              :src="$url + i"
              @click="seeImg(i)"
            />
            <div class="message_btn">
              <span class="message_reply" @click="reply(item, index)"
                >回复</span
              >
              <span>{{ item.createTime | messageTime(item.createTime) }}</span>
            </div>
          </div>
          <!-- 二级回复 -->
          <div
            class="message_two_cont"
            v-for="(replay, replayIndex) in replyTwoData"
            v-show="notice_top_show == index"
            :key="replayIndex"
          >
            <ul class="message_two">
              <li class="message_two_item">
                <div class="message_two_top">
                  <div class="message_user_img">
                    <!-- <div class="notice" v-show="notice_top_show">
                      <div class="notice_top">发送私信</div>
                      <div class="notice_bottom"></div>
                    </div> -->
                    <img
                      :src="$url + replay.userAvatar"
                      @click="sendTwoMessage(replay)"
                      title="发送私信"
                    />
                  </div>
                  <span>{{ replay.name }}:</span>
                </div>

                <div class="message_two_item_bottom">
                  <p>
                    {{ replay.message }}
                  </p>
                  <div class="message_two_item_right">
                    <!-- <span
                      class="message_two_item_btn"
                      @click="replyThree(item, replay)"
                      >回复</span
                    > -->
                    <span
                      class="message_two_item_btn"
                      v-show="dele"
                      @click="deletopicTwo(item, replay)"
                      >删除</span
                    >
                    <span class="message_two_item_time">{{
                      replay.createTime | lastTime(replay.createTime)
                    }}</span>
                  </div>
                </div>

                <!-- 三级回复 -->
                <!-- <div class="message_three_cont" v-if="0">
                  <ul class="message_two">
                    <li class="message_two_item three">
                      <div class="message_two_top">
                        <div class="message_user_img">
                          <img src="../assets/img/home/user.png" alt />
                        </div>
                        <span>同学1</span>
                        <span>回复</span>
                        <span>同学2</span>
                      </div>
                      <div class="message_three_item_bottom">
                        <p>
                          撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的
                        </p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele"
                            >删除</span
                          >
                          <span class="message_three_item_time"
                            >2020-07-13 18:20</span
                          >
                        </div>
                      </div>
                    </li>
                    <li class="message_two_item three">
                      <div class="message_two_top">
                        <div class="message_user_img">
                          <img src="../assets/img/home/user.png" alt />
                        </div>
                        <span>同学1</span>
                        <span>回复</span>
                        <span>同学2</span>
                      </div>
                      <div class="message_three_item_bottom">
                        <p>
                          撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的
                        </p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele"
                            >删除</span
                          >
                          <span class="message_three_item_time"
                            >2020-07-13 18:20</span
                          >
                        </div>
                      </div>
                    </li>
                    <li class="message_two_item three">
                      <div class="message_two_top">
                        <div class="message_user_img">
                          <img src="../assets/img/home/user.png" alt />
                        </div>
                        <span>同学1</span>
                        <span>回复</span>
                        <span>同学2</span>
                      </div>
                      <div class="message_three_item_bottom">
                        <p>
                          撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的
                        </p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele"
                            >删除</span
                          >
                          <span class="message_three_item_time"
                            >2020-07-13 18:20</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div> -->
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <slot name="page"></slot>
  </div>
</template>

<script>
import addDiscuss from "../components/edit/addDiscuss";
import seeImg from "../components/edit/seeImg";
export default {
  name: "discuss",
  props: ["dele", "privateTopic"],
  data() {
    return {
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
      deleCheck: [],
      diseaseType: "",
      keyword: "",
      topicData: "",
      discussData: {},
      discuss_show: false,
      imgs_show: false,
      notice_top_show: "-1",
      replyTwoData: "",
      messageId: "",
      url: "",
      index: "",
      textIpts: "",
      authority: "",
    };
  },
  components: {
    addDiscuss,
    seeImg,
  },
  mounted() {
    this.authority = localStorage.getItem("authority");
    if (!this.privateTopic) {
      this.getTopic();
    } else {
      this.getMine();
    }
  },
  methods: {
    //获取话题列表
    getTopic(index = "-1") {
      this.axios
        .get("/topic", {
          params: {
            keyword: this.keyword,
            diseaseType: this.diseaseType,
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.topicData = res.data.rows;
          this.notice_top_show = index;
        });
    },
    //获取我的问题
    getMine(index = "-1") {
      this.axios
        .get("/topic/mine", {
          params: {
            diseaseType: this.diseaseType,
            keyword: this.keyword,
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.topicData = res.data.rows;
          this.notice_top_show = index;
        });
    },
    // 1级回复
    reply(e, index) {
      this.index = index;
      this.discuss_show = true;
      this.discussData = e;
    },
    //2级回复
    replyTwo(item, index) {
      this.axios
        .get(`/topic/${item.topicId}/message`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.$Message.warning("当前项无回复内容");
            return;
          }
          this.replyTwoData = res.data.rows;
          this.notice_top_show = index;
          this.discussData = item;
        });
    },
    //3级回复
    replyThree(one, two) {
      this.discuss_show = true;
      this.discussData = one;
      this.messageId = two.messageId;
    },
    //查看大图
    seeImg(i) {
      this.imgs_show = true;
      this.url = this.$url + i;
    },
    //删除话题
    deleTopic() {
      this.axios.delete(`/topic/${this.deleCheck.toString()}`).then((res) => {
        if (res.code == "000000") {
          if (this.authority == "TEACHER") {
            this.getTopic();
          } else {
            this.getMine();
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //删除回复
    deletopicTwo(item, replay) {
      this.axios
        .delete(`/topic/${item.topicId}/message/${replay.messageId}`)
        .then((res) => {
          if (res.code == "000000") {
            this.replyTwo(item, this.notice_top_show);
          }
        });
    },
    //发送私信
    sendmessage(item) {
      let userId = localStorage.getItem("userId");
      if (userId == item.userId) {
        this.$Message.error("不可以发送私信给自己");
        return;
      }
      this.textIpts = "请输入私信内容......";
      this.discuss_show = true;
      this.discussData.name = item.name;
      this.discussData.userId = item.userId;
    },
    //二级私信
    sendTwoMessage(replay) {
      let userId = localStorage.getItem("userId");
      if (userId == replay.userId) {
        this.$Message.error("不可以发送私信给自己");
        return;
      }
      this.$store.state.menuId = 3;
      this.$router.push({
        name: "messageprivate",
        params: {
          userId: replay.userId,
        },
      });
    },
    //搜索
    searchTopic() {
      if (!this.privateTopic) {
        this.getTopic();
      } else {
        this.getMine();
      }
    },
  },
};
</script>

<style lang="scss">
.message_forum {
  height: 100%;
  .main_header {
    .select {
      width: 165px;
    }
    .text_box {
      width: 300px;
      margin-left: 50px;
    }
    label {
      margin-left: 770px;
    }
    justify-content: flex-end;
  }
  .main_table {
    width: 99%;
    min-width: 1637px;
    height: 76%;
    min-width: 1375px;
    .message_list {
      overflow-y: auto;
      height: 100%;
      width: 100%;
      .message_item {
        width: 99%;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
        .load {
          position: absolute;
          color: rgb(0, 235, 255);
          left: 85%;
          bottom: 0;
          height: 22px;
          .load_icon {
            display: inline-block;
            background: url("../assets/public/message.png") no-repeat center;
            background-size: 100% 100%;
            width: 16px;
            height: 16px;
            position: absolute;
            left: -16px;
            top: 3px;
          }
        }
        .load:hover .load_text {
          border-bottom: 1px solid rgb(0, 235, 255);
        }
        .message_left {
          background: rgb(26, 127, 195, 0.2);
          width: 70%;
          min-width: 945px;
          display: flex;
          float: left;
          height: 100px;
          input {
            // width: 22px;
            // height: 22px;
            margin: 25px 30px 0 15px;
          }
          .message_img {
            height: 100%;
            width: 80px;
            margin-right: 10px;
            position: relative;
            .notice {
              position: absolute;
              width: 65px;
              height: 40px;
              top: -20px;
              left: 7px;
              color: rgb(0, 0, 0);
              .notice_top {
                background: rgb(255, 255, 255);
                border: 1px solid rgb(255, 255, 255);
                border-radius: 5px;
              }
              .notice_bottom {
                width: 10px;
                height: 10px;
                background: rgb(255, 255, 255);
                transform: rotate(-45deg);
                margin-left: 25px;
                top: 18px;
                position: absolute;
              }
            }
            img {
              margin: 10px 15px 5px 15px;
              width: 50px;
              height: 50px;
              border: 1px solid transparent;
              border-radius: 5px;
            }
            span {
              text-align: center;
              display: inline-block;
              width: 80px;
            }
          }
          .message_title {
            width: 100%;
            span {
              font-size: 18px;
              line-height: 70px;
              height: 50px;
              display: inline-block;
              width: 89%;
              overflow: hidden; //隐藏文字
              text-overflow: ellipsis; //显示...
              white-space: nowrap; //不换行
            }
            span:last-child {
              font-size: 16px;
              line-height: 32px;
            }
          }
        }
        .message_right {
          background: rgb(26, 127, 195, 0.2);
          display: flex;
          justify-content: flex-end;
          height: 100px;
          width: 30%;
          img {
            width: 80px;
            height: 80px;
            border: 1px solid transparent;
            border-radius: 5px;
            margin: 9px;
          }
          .message_btn {
            width: 90px;
            height: 100%;
            text-align: center;
            margin-right: 25px;
            margin-left: 45px;
            span {
              display: inline-block;
              width: 100%;
              height: 45px;
              line-height: 45px;
            }
            .message_reply {
              cursor: pointer;
              margin-top: 15px;
              border: 1px solid rgb(0, 235, 255);
              border-radius: 5px;
            }
            .message_reply:hover {
              color: rgb(0, 235, 255);
            }
          }
        }
      }
      // 二级回复
      .message_two_cont {
        width: 100%;
        .message_two {
          width: 74%;
          min-width: 1157px;
          margin-left: 8%;
          margin-top: 20px;
          .message_two_item {
            width: 100%;
            border-bottom: 1px solid rgb(255, 255, 255);
            .message_two_top {
              width: 100%;
              height: 35px;
              display: flex;
              .message_user_img {
                width: 35px;
                height: 35px;
                margin-right: 10px;
                border: 1px solid transparent;
                border-radius: 3px;
                position: relative;
                img {
                  height: 100%;
                  width: 100%;
                }
                .notice {
                  position: absolute;
                  width: 65px;
                  height: 40px;
                  top: -32px;
                  left: -15px;
                  color: rgb(0, 0, 0);
                  .notice_top {
                    background: rgb(255, 255, 255);
                    border: 1px solid rgb(255, 255, 255);
                    border-radius: 5px;
                  }
                  .notice_bottom {
                    width: 10px;
                    height: 10px;
                    background: rgb(255, 255, 255);
                    transform: rotate(-45deg);
                    margin-left: 25px;
                    top: 18px;
                    position: absolute;
                  }
                }
              }
              span {
                height: 35px;
                line-height: 35px;
              }
            }
            .message_two_item_bottom {
              // border-bottom: 1px solid rgb(255, 255, 255);
              position: relative;
              p {
                display: inline-block;
                width: 80%;
                min-width: 917px;
                margin-left: 45px;
                margin-bottom: 10px;
              }
              .message_two_item_right {
                position: absolute;
                float: right;
                height: 20px;
                right: 0;
                bottom: 10px;
                .message_two_item_btn {
                  cursor: pointer;
                  color: rgb(0, 235, 255);
                  margin-right: 10px;
                  display: none;
                }
                .message_two_item_btn:hover {
                  border-bottom: 1px solid rgb(0, 235, 255);
                }
              }
            }
          }
          .message_two_item_bottom:hover
            .message_two_item_right
            > .message_two_item_btn {
            display: inline-block;
          }
          // 三级回复
          .message_three_cont {
            .message_two {
              width: 100%;
              margin-left: 0;
              .message_two_top {
                margin-left: 50px;
                span {
                  margin-right: 5px;
                }
                span {
                  color: rgb(0, 235, 255);
                }
                span:nth-child(3) {
                  color: rgb(106, 118, 132);
                }
              }
              .message_two_item_bottom,
              .message_two_item {
                border: none;
              }
            }
            .message_three_item_bottom {
              position: relative;
              p {
                display: inline-block;
                width: 76%;
                margin-left: 90px;
                margin-bottom: 10px;
              }
              .message_three_item_right {
                position: absolute;
                float: right;
                height: 20px;
                right: 0;
                bottom: 10px;
                .message_three_item_btn {
                  cursor: pointer;
                  color: rgb(0, 235, 255);
                  margin-right: 10px;
                  display: none;
                }
                .message_three_item_btn:hover {
                  border-bottom: 1px solid rgb(0, 235, 255);
                }
              }
            }
            .message_two_item.three:hover .message_three_item_btn {
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 1700px) {
  .load {
    left: 95% !important;
  }
}
</style>