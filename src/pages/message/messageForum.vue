<template>
  <div class="message_forum scrollbar">
    <div class="main_header">
      <label for>分类</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <input type="text" class="text_box" placeholder="请输入关键词" />
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <ul class="message_list">
        <li class="message_item edit_class">
          <div class="message_left">
            <input type="checkbox" />
            <div class="message_img">
              <img src="../../assets/img/home/user.png" alt />
              <span>张三</span>
            </div>
            <div class="message_title">
              <span>大数据的哈数据库的哈萨克觉得哈萨克觉dasdasdas的撒大苏打实打实发生发生得等哈数据库的哈萨克记得哈数据库说的话卡刷点卡数据的哈萨克</span>
              <span>大厦打开萨迪克吉萨高地和凯撒干点啥大哥杀手看到过哈萨克结婚打算空间和空间号登机口撒谎打卡时间</span>
            </div>
          </div>
          <div class="message_right">
            <img src="../../assets/img/home/user.png" alt />
            <img src="../../assets/img/home/user.png" alt />
            <img src="../../assets/img/home/user.png" alt />
            <div class="message_btn">
              <span class="message_reply">回复</span>
              <span>2020-07-24</span>
            </div>
          </div>
          <div class="message_cont">
            <ul></ul>
          </div>
        </li>
        <li class="message_item edit_class">
          <div class="message_left">
            <input type="checkbox" />
            <div class="message_img">
              <img src="../../assets/img/home/user.png" alt />
              <span>张三</span>
            </div>
            <div class="message_title">
              <span>大数据的哈数据库的哈萨克觉得哈萨克觉dasdasdas的撒大苏打实打实发生发生得等哈数据库的哈萨克记得哈数据库说的话卡刷点卡数据的哈萨克</span>
              <span>大厦打开萨迪克吉萨高地和凯撒干点啥大哥杀手看到过哈萨克结婚打算空间和空间号登机口撒谎打卡时间</span>
            </div>
          </div>
          <div class="message_right">
            <img src="../../assets/img/home/user.png" alt />
            <img src="../../assets/img/home/user.png" alt />
            <img src="../../assets/img/home/user.png" alt />
            <div class="message_btn">
              <span class="message_reply">回复</span>
              <span>2020-07-24</span>
            </div>
          </div>
          <div class="message_cont">
            <ul></ul>
          </div>
        </li>
        
      </ul>
    </div>
    <turn-page></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
  name: "message-forum",
  data() {
    return {};
  },
  components: {
    turnPage,
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
    justify-content: flex-end;
  }
  .main_table {
    width: 99%;
    height: 76%;
    .message_list {
      overflow-y: auto;
      height: 100%;
      width: 100%;
      .message_item {
        display: flex;
        justify-content: space-between;
        width: 99%;
        margin: 0 auto;
        height: 100px;
        margin-top: 8px;
        background: rgb(26, 127, 195, 0.2);
        .message_left {
          width: 70%;
          min-width: 945px;
          display: flex;
          input {
            width: 22px;
            height: 22px;
            margin: 25px 20px 0 15px;
          }
          .message_img {
            height: 100%;
            width: 80px;
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
          display: flex;
          justify-content: flex-end;
          width: 30%;
          img {
            width: 80px;
            height: 80px;
            border: 1px solid rgb(0, 235, 255);
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
        .message_cont {
          background: salmon;
          width: 100%;
          top: 200px;
           position: relative;
           &:after{
               position: absolute;
           } 
          ul {
            width: 75%;
            height: 200px;
            background: sienna;
            margin-left: 8%;
          }
        }
      }
    }
  }
}
</style>