<template>
  <div class="home_user">
    <div class="home_user_left" @mousemove="move" @mouseleave="leave">
      <i></i>
      <span>消息</span>
      <p :class="{ active: total > 0 }">
        {{ messageData.total }}
      </p>
      <div class="user_message" :class="{ active: active_show }">
        <i></i>
        <div class="user_pseudo"></div>
        <div class="user_name">
          <span class="my_message">我的消息</span>
          <span class="dele_message" @click="deleallmessage">清空消息</span>
        </div>
        <div class="user_list scrollbar">
          <ul>
            <li
              v-for="(item, index) in messageData.rows"
              :key="index"
              @click="seeMessage(item)"
            >
              <div class="user_img">
                <div class="border" v-show="item.status"></div>
                <img :src="item.avatar ? item.avatar : url" alt />
              </div>
              <div class="user_column">
                <div class="title">
                  {{ item.userId }}回复:{{ item.message }}
                </div>
                <div class="cont">
                  {{ item.title }}
                </div>
                <div class="time">
                  {{ item.createTime | lastTime(item.createTime) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home_user_right">
      <div class="user_img_big">
        <img
          :src="avatar ? avatar : current.avatar"
          alt=""
          v-if="current.avatar"
        />
        <img src="../assets/public/timg.png" alt v-else />
        <div class="headr_select">
          <p></p>
          <div class="pseudo"></div>
          <div class="select_name">用户名</div>
          <div class="select_list">
            <ul>
              <li
                v-for="(item, index) in list"
                :key="index"
                :class="{ select_item: itemIndex == index }"
                @click="routeLink(item.router, index)"
              >
                {{ item.title }}
              </li>
              <li @click="routeLink('退出登入')">退出登入</li>
            </ul>
          </div>
        </div>
      </div>
      <span>{{ current.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user-header",
  data() {
    return {
      url:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607154641504&di=916323c0d529c4662d2cca0728e2193f&imgtype=0&src=http%3A%2F%2Ffiles.bbs.tl.changyou.com%2Fdata%2Fattachment%2Fforum%2F201508%2F04%2F115041d8rtar5rzl9bz3j8.jpg",
      itemIndex: "-1",
      current: "",
      list: [],
      messageData: "",
      active_show: false,
      total: "",
    };
  },
  computed: {
    ...mapState(["adminMenu", "teacherMenu", "stuedntMenu", "avatar"]),
  },
  mounted() {
    this.axios.get("/users/current").then((res) => {
      this.current = res.data;
      if (res.data.authority == "ADMIN") {
        this.list = this.adminMenu;
      }
      if (res.data.authority == "TEACHER") {
        this.list = this.teacherMenu;
      }
      if (res.data.authority == "STUDENT") {
        this.list = this.stuedntMenu;
      }
    });
    this.getmessage();
  },
  methods: {
    routeLink(router, index) {
      this.itemIndex = index;
      if (router == "退出登入") {
        this.axios.get("logout").then(() => {
          this.$router.push("/");
          localStorage.clear();
        });
      }
      this.$router.push(router);
      this.$store.state.menuId = index;
      localStorage.setItem("bgindex", index);
    },
    //获取提示消息
    getmessage() {
      this.axios
        .get("/message/my", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.messageData = res.data;
          this.total = res.data.rows.length;
        });
    },
    //设为已读消息
    seeMessage(item) {
      this.axios.delete(`/message/${item.messageId}`).then((res) => {
        if (res.code == "000000") {
          this.getmessage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //清空所有消息
    deleallmessage() {
      this.axios.delete("message/my").then((res) => {
        if (res.code == "000000") {
          this.getmessage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //显示隐藏消息
    move() {
      if (this.messageData.rows.length > 0) {
        this.active_show = true;
      }
    },
    leave() {
      this.active_show = false;
    },
  },
};
</script>

<style lang="scss">
.home_user {
  display: flex;
  height: 50px;
  margin-top: 20px;
  .home_user_left {
    display: flex;
    align-content: center;
    align-items: center;
    position: relative;
    i {
      background: url("../assets/img/home/news.png");
      width: 27px;
      height: 30px;
      margin-right: 10px;
    }
    p {
      width: 14px;
      height: 14px;
      line-height: 14px;
      font-size: 8px;
      border-radius: 50%;
      background-color: rgb(255, 0, 0);
      position: absolute;
      top: 10px;
      right: 36px;
      text-align: center;
      display: none;
    }
    .user_message {
      position: absolute;
      width: 685px;
      background: rgb(255, 255, 255);
      z-index: 999999;
      max-height: 700px;
      left: -500px;
      top: 58px;
      border-radius: 10px;
      display: none;
      i {
        width: 20px;
        height: 20px;
        position: absolute;
        background: rgb(255, 255, 255);
        left: 503px;
        top: -10px;
        transform: rotate(-45deg);
      }
      .user_pseudo {
        width: 85%;
        height: 50px;
        position: absolute;
        top: -50px;
      }
      .user_name {
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(220, 230, 240);
        .my_message {
          margin-left: 315px;
          font-size: 18px;
          background: linear-gradient(
            to right,
            rgb(18, 195, 237),
            rgb(47, 138, 255)
          );
          background-clip: text;
          color: transparent;
        }
        .dele_message {
          margin-right: 30px;
          color: rgb(175, 175, 175);
        }
        .dele_message:hover {
          cursor: pointer;
        }
      }
      .user_list {
        width: 100%;
        max-height: 645px;
        ::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: rgb(175, 175, 175);
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: rgb(217, 218, 219);
        }
        ul {
          overflow-y: auto;
          width: 98%;
          margin: 0 auto;
          max-height: 100%;
          li {
            width: 96%;
            height: 75px;
            margin: 10px auto;
            border-bottom: 1px solid rgb(212, 227, 241);
            display: flex;
            img {
              border-radius: 5px;
            }
            .user_column {
              margin-left: 20px;
              display: flex;
              flex-direction: column;
              width: 560px;
              .title,
              .cont {
                width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: rgb(40, 200, 240);
              }
              .title {
                margin-top: 20px;
              }
              .cont {
                color: rgb(175, 175, 175);
              }
              .time {
                color: rgb(175, 175, 175);
                text-align: right;
              }
            }
          }
          li:hover {
            cursor: pointer;
            background: rgb(0, 0, 0, 0.1);
          }
        }
      }
    }
    .active {
      display: block;
    }
  }
  .home_user_right {
    display: flex;
    align-content: center;
    align-items: center;
    margin-right: 50px;
    margin-left: 15px;
    position: relative;
    .user_img_big {
      margin-right: 10px;
      width: 50px;
      height: 50px;
      padding: 3px;
      border: rgb(2, 136, 210) solid 1px;
      border-radius: 50%;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      .headr_select {
        display: none;
        width: 150px;
        position: absolute;
        text-align: center;
        left: -50px;
        top: 55px;
        z-index: 999999;
        .pseudo {
          height: 50px;
          position: relative;
          width: 100%;
          position: absolute;
          top: -50px;
        }
        p {
          width: 20px;
          height: 20px;
          background: rgb(255, 255, 255);
          position: absolute;
          top: 0;
          z-index: 999999;
          left: 50%;
          margin-left: -8px;
          top: 0px;
          transform: rotate(-45deg);
        }
        .select_name {
          background: rgb(255, 255, 255);
          color: rgb(34, 163, 247);
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom: 1px solid rgb(220, 230, 240);
          height: 45px;
          line-height: 45px;
          width: 100%;
          margin-top: 10px;
        }
        .select_list {
          background: rgb(255, 255, 255);
          color: rgb(0, 0, 0);
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          width: 100%;
          top: 50px;
          li {
            height: 35px;
            line-height: 35px;
          }
          li:hover {
            color: rgb(255, 255, 255);
            cursor: pointer;
            background-image: linear-gradient(
              to right,
              rgb(18, 195, 237),
              rgb(47, 138, 255)
            );
          }
          li:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .select_item {
            color: rgb(255, 255, 255);
            background-image: linear-gradient(
              to right,
              rgb(18, 195, 237),
              rgb(47, 138, 255)
            );
          }
        }
      }
    }
    .user_img_big:hover .headr_select {
      display: block;
    }
  }
}
</style>