<template>
  <div class="message_forum scrollbar">
    <add-discuss v-if="0"></add-discuss>
    <see-img :url="url" v-if="0"></see-img>
    <div class="main_header">
      <button class="dele" v-if="dele">批量删除</button>
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
        <!-- 1级问题 -->
        <li class="message_item edit_class">
          <div class="load">
            <span class="load_icon"></span>
            <span class="load_text">展开回复</span>
          </div>
          <div class="message_left">
            <input type="checkbox" v-if="dele" />
            <div class="message_img">
              <div class="notice">
                <div class="notice_top">发送私信</div>
                <div class="notice_bottom"></div>
              </div>
              <img src="../assets/img/home/user.png" title="发送私信" />
              <span>张三</span>
            </div>
            <div class="message_title">
              <span>大数据的哈数据库的哈萨克觉得哈萨克的撒大苏打实打实发生发生得等哈数据库的哈萨克记得哈数据库说的话卡刷生得等哈数据库的哈萨克记得生得等哈数据库的哈萨克记得</span>
              <span>大厦打开萨迪克吉萨高地和凯撒干点啥大哥杀手看到过哈萨克结婚打算空间和空间号登机口撒谎打卡时间</span>
            </div>
          </div>
          <div class="message_right">
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <div class="message_btn">
              <span class="message_reply">回复</span>
              <span>2020-07-24</span>
            </div>
          </div>
          <!-- 二级回复 -->
          <div class="message_two_cont" v-if="1">
            <ul class="message_two">
              <li class="message_two_item">
                <div class="message_two_top">
                  <div class="message_user_img">
                    <div class="notice">
                      <div class="notice_top">发送私信</div>
                      <div class="notice_bottom"></div>
                    </div>
                    <img src="../assets/img/home/user.png" alt />
                  </div>
                  <span>同学1:</span>
                </div>

                <div class="message_two_item_bottom">
                  <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                  <div class="message_two_item_right">
                    <span class="message_two_item_btn">回复</span>
                    <span class="message_two_item_btn" v-if="dele">删除</span>
                    <span class="message_two_item_time">2020-07-13 18:20</span>
                  </div>
                </div>

                <!-- 三级回复 -->
                <div class="message_three_cont" v-if="1">
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
                        <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele">删除</span>
                          <span class="message_three_item_time">2020-07-13 18:20</span>
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
                        <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele">删除</span>
                          <span class="message_three_item_time">2020-07-13 18:20</span>
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
                        <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele">删除</span>
                          <span class="message_three_item_time">2020-07-13 18:20</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="message_item edit_class">
          <div class="load">
            <span class="load_icon"></span>
            <span class="load_text">展开回复</span>
          </div>
          <div class="message_left">
            <input type="checkbox" v-if="dele" />
            <div class="message_img">
              <div class="notice">
                <div class="notice_top">发送私信</div>
                <div class="notice_bottom"></div>
              </div>
              <img src="../assets/img/home/user.png" title="发送私信" />
              <span>张三</span>
            </div>
            <div class="message_title">
              <span>大数据的哈数据库的哈萨克觉得哈萨克的撒大苏打实打实发生发生得等哈数据库的哈萨克记得哈数据库说的话卡刷生得等哈数据库的哈萨克记得生得等哈数据库的哈萨克记得</span>
              <span>大厦打开萨迪克吉萨高地和凯撒干点啥大哥杀手看到过哈萨克结婚打算空间和空间号登机口撒谎打卡时间</span>
            </div>
          </div>
          <div class="message_right">
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <div class="message_btn">
              <span class="message_reply">回复</span>
              <span>2020-07-24</span>
            </div>
          </div>
          <!-- 二级回复 -->
          <div class="message_two_cont" v-if="1">
            <ul class="message_two">
              <li class="message_two_item">
                <div class="message_two_top">
                  <div class="message_user_img">
                    <div class="notice">
                      <div class="notice_top">发送私信</div>
                      <div class="notice_bottom"></div>
                    </div>
                    <img src="../assets/img/home/user.png" alt />
                  </div>
                  <span>同学1:</span>
                </div>
                <div class="message_two_item_bottom">
                  <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                  <div class="message_two_item_right">
                    <span class="message_two_item_btn">回复</span>
                    <span class="message_two_item_btn" v-if="dele">删除</span>
                    <span class="message_two_item_time">2020-07-13 18:20</span>
                  </div>
                </div>

                <!-- 三级回复 -->
                <div class="message_three_cont" v-if="1">
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
                        <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele">删除</span>
                          <span class="message_three_item_time">2020-07-13 18:20</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li class="message_item edit_class">
          <div class="message_left">
            <input type="checkbox" v-if="dele" />
            <div class="message_img">
              <div class="notice">
                <div class="notice_top">发送私信</div>
                <div class="notice_bottom"></div>
              </div>
              <img src="../assets/img/home/user.png" title="发送私信" />
              <span>张三</span>
            </div>
            <div class="message_title">
              <span>大数据的哈数据库的哈萨克觉得哈萨克觉dasdasdas的撒大苏打实打实发生发生得等哈数据库的哈萨克记得哈数据库说的话卡刷点卡数据的哈萨克</span>
              <span>大厦打开萨迪克吉萨高地和凯撒干点啥大哥杀手看到过哈萨克结婚打算空间和空间号登机口撒谎打卡时间</span>
            </div>
          </div>
          <div class="message_right">
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <img src="../assets/img/home/user.png" alt />
            <div class="message_btn">
              <span class="message_reply">回复</span>
              <span>2020-07-24</span>
            </div>
          </div>
          <!-- 二级回复 -->
          <div class="message_two_cont" v-if="1">
            <ul class="message_two">
              <li class="message_two_item">
                <div class="message_two_top">
                  <div class="message_user_img">
                    <div class="notice">
                      <div class="notice_top">发送私信</div>
                      <div class="notice_bottom"></div>
                    </div>
                    <img src="../assets/img/home/user.png" alt />
                  </div>
                  <span>同学1:</span>
                </div>
                <div class="message_two_item_bottom">
                  <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                  <div class="message_two_item_right">
                    <span class="message_two_item_btn">回复</span>
                    <span class="message_two_item_btn" v-if="dele">删除</span>
                    <span class="message_two_item_time">2020-07-13 18:20</span>
                  </div>
                </div>

                <!-- 三级回复 -->
                <div class="message_three_cont" v-if="1">
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
                        <p>撒大撒大撒的撒和节能宣传周名称的的的的大撒大撒大撒的撒和节能宣传周名称的的的的</p>
                        <div class="message_three_item_right">
                          <span class="message_three_item_btn">回复</span>
                          <span class="message_three_item_btn" v-if="dele">删除</span>
                          <span class="message_three_item_time">2020-07-13 18:20</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
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
  data() {
    return {
      url:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600503265386&di=d1fea52a78eeff71cf94e6555e73b2d7&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3363001160%2C1163944807%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D830",
    };
  },
  components: {
    addDiscuss,
    seeImg,
  },
  props: ["dele"],
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
              border-bottom: 1px solid rgb(255, 255, 255);
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