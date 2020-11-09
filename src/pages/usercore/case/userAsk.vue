<template>
  <div class="user_ask">
    <div class="case_layout">
      <div class="case_left">
        <case-header></case-header>
        <main>
          <ul class="main_tab">
            <li
              v-for="(item, index) in tabData"
              :key="index"
              class="item_title"
              @click="container(item)"
            >
              {{ item.name }}
              <div :class="{ active: typeId == item.moduleId }"></div>
            </li>
            <i class="tips"></i>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <!-- 主诉 -->
              <ul v-show="'主诉' == typeName">
                <li
                  v-for="(item, index) in askData0"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 现病史 -->
              <ul v-show="'现病史' == typeName">
                <li
                  v-for="(item, index) in askData1"
                  :key="index"
                  style="height: 35px"
                >
                  <i
                    v-if="typeId == 1"
                    :style="{ background: select[item.colorId].color }"
                  ></i>
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 既往史 -->
              <ul v-show="'既往史' == typeName">
                <li
                  v-for="(item, index) in askData2"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 个人史 -->
              <ul v-show="'个人史' == typeName">
                <li
                  v-for="(item, index) in askData3"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 婚育史 -->
              <ul v-show="'婚育史' == typeName">
                <li
                  v-for="(item, index) in askData4"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 月经史 -->
              <ul v-show="'月经史' == typeName">
                <li
                  v-for="(item, index) in askData5"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
              <!-- 家族史 -->
              <ul v-show="'家族史' == typeName">
                <li
                  v-for="(item, index) in askData6"
                  :key="index"
                  style="height: 35px"
                >
                  <div class="item_cont" style="flex-direction: column">
                    <span>{{ item.question }}</span>
                  </div>
                  <div class="item_edit" @click="asked(item)">
                    <span @click="item.typeId = '1'" v-if="item.typeId == '0'"
                      >询问</span
                    >
                    <span class="ask_tips" v-if="item.typeId == '1'"></span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="content_bottom">
            <input
              type="text"
              class="text_box"
              placeholder="请输入关键字.."
              v-model="keyword"
            />
            <button class="submit" @click="keyword = ''">清空</button>
          </div>
        </main>
      </div>
      <div class="case_right scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in askedArr" :key="index">
            <div class="asked_right">
              <img src="../../../assets/public/timg1.jpg" alt="" />
              <div class="asked_right_box">
                <i></i>
                <span>{{ item.question }}</span>
              </div>
            </div>
            <div class="asked_left">
              <img src="../../../assets/public/timg1.jpg" alt="" />
              <div class="asked_left_box">
                <i></i>
                <span>{{ item.answer }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import caseHeader from "../../teacher/edit/caseHeader";

export default {
  name: "user-ask",
  components: {
    caseHeader,
  },
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
      select: [
        {
          title: "发病情况",
          color: "rgb(255,167,39)",
        },
        {
          title: "主症特点",
          color: "rgb(254,236,74)",
        },
        {
          title: "伴随症状及鉴别诊断症状",
          color: "rgb(115,213,114)",
        },
        {
          title: "诊疗过程",
          color: "rgb(36,169,245)",
        },
        {
          title: "发作情况",
          color: "rgb(150,117,206)",
        },
        {
          title: "刻下症",
          color: "rgb(0,230,255)",
        },
      ],
      tabData: {},
      askData0: {},
      askData1: {},
      askData2: {},
      askData3: {},
      askData4: {},
      askData5: {},
      askData6: {},
      askedArr: [],
      caseId: "",
      typeId: "0",
      typeName: "主诉",
      examNo: "",
      currentIndex: "",
      keyword: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getTabdata();
    let arr = JSON.parse(localStorage.getItem("askedArr"));
    if (arr == null || arr.length == "0") {
      return;
    }
    this.askedArr = arr;
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("askedArr", JSON.stringify(this.askedArr));
    });
  },
  methods: {
    getTabdata() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
          for (let i = 0; i < res.data.length; i++) {
            this.getAskData(res.data[i].moduleId);
          }
        });
    },
    getAskData(typeId) {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/asks`, {
          params: {
            keyword: this.keyword,
            typeId: typeId,
            page: "1",
            size: "1000",
          },
        })
        .then((res) => {
          switch (typeId) {
            case 0:
              this.askData0 = res.data.rows;
              break;
            case 1:
              this.askData1 = res.data.rows;
              break;
            case 2:
              this.askData2 = res.data.rows;
              break;
            case 3:
              this.askData3 = res.data.rows;
              break;
            case 4:
              this.askData4 = res.data.rows;
              break;
            case 5:
              this.askData5 = res.data.rows;
              break;
            case 6:
              this.askData6 = res.data.rows;
              break;
          }
        });
    },
    asked(item) {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/ask/${item.id}`)
        .then(() => {
          setTimeout(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          }, 300);
          this.askedArr.push(item);
        });
    },
    container(i) {
      this.typeId = i.moduleId;
      this.typeName = i.name;
    },
  },
  watch: {
    keyword: function () {
      this.getAskData(this.typeId);
    },
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("askedArr", JSON.stringify(this.askedArr));
    next();
  },
};
</script>

<style lang="scss">
.user_ask {
  .content_scrollbar {
    ul {
      li {
        .item_edit {
          span:first-child:hover {
            cursor: pointer;
          }
        }

        .ask_tips {
          width: 28px;
          height: 20px;
          border-radius: 50%;
          background: url("../../../assets/public/askTips.png") no-repeat center;
          background-size: 80% 100%;
        }
      }
    }
  }
  .text_box {
    margin-left: 25px;
    width: 960px !important;
  }
  .case_right {
    ul {
      width: 99%;
      height: 710px;
      margin-top: 20px;
      overflow-y: auto;
      li {
        width: 100%;
        margin-bottom: 10px;
        .asked_right,
        .asked_left {
          width: 96%;
          margin: 0 auto;
          display: flex;
          .asked_right_box,
          .asked_left_box {
            max-width: 250px;
            position: relative;
            border-radius: 5px;
            display: flex;
            align-items: center;
            padding: 10px 10px;
            span {
              min-width: 30px;
              max-width: 96%;
              word-break: break-word;
              color: rgb(0, 0, 0);
              margin-left: 10px;
            }
            i {
              display: block;
              width: 20px;
              height: 20px;
              position: absolute;
            }
          }
          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
          }
        }
        .asked_right {
          flex-direction: row-reverse;
          .asked_right_box {
            margin-right: 30px;
            background: rgb(0, 235, 255);
            i {
              background: rgb(0, 235, 255);
              right: -10px;
              top: 10px;
              transform: rotate(-45deg);
            }
          }
        }
        .asked_left {
          margin-top: 15px;
          .asked_left_box {
            margin-left: 30px;
            background: rgb(255, 255, 255);
            i {
              background: rgb(255, 255, 255);
              left: -10px;
              top: 10px;
              transform: rotate(-45deg);
            }
          }
        }
      }
    }
  }
}
</style>