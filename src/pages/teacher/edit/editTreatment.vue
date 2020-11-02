<template>
  <div class="case_treatment">
    <div class="treatment_layout">
      <div class="layout_left">
        <div class="title">
          <p>治则治法</p>
          <div class="search scrollbar">
            <input
              type="text"
              class="text_box"
              v-model="searchTreat"
              @focus="treatShow = true"
              @blur="timerOuttreat"
            />
            <div class="search_down scrollbar">
              <div
                class="search_down_cont"
                v-for="(item, index) in treatData"
                :key="index"
                @click="treatVal(item)"
                v-show="treatShow"
              >
                <div class="search_item">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layout_search">
          <div class="search_top">
            <p>遣方用药</p>
            <a href="javascript:;">药材库</a>
          </div>
          <div class="search_bottom">
            <div class="prescription">
              <p>常见方剂</p>
              <div class="search scrollbar">
                <input
                  type="text"
                  class="text_box"
                  v-model="searchAgentia"
                  @focus="agentiaShow = true"
                  @blur="timerOutagentia"
                />
                <div class="search_down" v-show="agentiaShow">
                  <div class="search_down_cont">
                    <div
                      class="search_item"
                      v-for="(item, index) in agentiaData"
                      :key="index"
                      @click="agentiaVal(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="prescription">
              <p>常见方药</p>
              <div class="search">
                <input type="text" class="text_box" />
                <div class="search_down scrollbar">
                  <div class="search_down_cont">
                    <div class="search_item">1</div>
                    <div class="search_item">1</div>
                    <div class="search_item">1</div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div class="treatment_main">
          <div class="main_left">
            <ul>
              <li>{{ agentiaList.name }}</li>
            </ul>
          </div>
          <div class="main_right">
            <ul>
              <li v-for="(item, index) in agentiaList" :key="index">
                <span v-for="(i, index) in item" :key="index">
                  {{ i }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="layout_right">
        <div class="title">辩证依据</div>
        <div class="disease">
          <div class="disease_title">
            病名:
            <div>{{ diseaseName }}</div>
          </div>
          <ul class="main_tab">
            <li
              style="height: auto"
              v-for="(item, index) in tab"
              :key="index"
              class="item_title"
              @click="seeItem(index)"
            >
              {{ item }}
              <div :class="{ active: typeId == index }"></div>
            </li>
          </ul>
          <div class="scrollbar">
            <!-- 望诊 -->
            <ul v-show="typeId == 0">
              <li v-for="(item, index) in watchData" :key="index">
                <span>{{ item.name }}</span>
                <p></p>
                {{ item.answer }}
              </li>
            </ul>
            <!-- 闻诊 -->
            <ul v-show="typeId == 1">
              <li v-for="(item, index) in listenData" :key="index">
                <span>{{ item.name }}</span>
                <p></p>
                {{ item.answer }}
              </li>
            </ul>
            <!-- 问诊 -->
            <ul v-show="typeId == 2" class="ask">
              <li v-for="(item, index) in askData" :key="index">
                <span>问: {{ item.answer }}</span>
                <span> 答: {{ item.question }}</span>
              </li>
            </ul>
            <!-- 切诊 -->
            <ul v-show="typeId == 3">
              <li v-if="pulseData.answer">
                <span>脉诊</span>
                <p></p>
                {{ pulseData.answer }}
              </li>
              <li v-for="(item, index) in pressData" :key="index">
                <span>{{ item.name }}</span>
                <p></p>
                {{ item.answer }}
              </li>
            </ul>
          </div>
        </div>
        <div class="disease">
          <div class="disease_title">
            症型:
            <div v-for="(item, index) in diseasesRadio" :key="index">
              <input
                type="radio"
                name="disease"
                @change="seeDisease(item)"
                :value="item.id"
                v-model="defaultOptions.id"
              />
              <label for="">{{ item.name }}</label>
            </div>
          </div>
          <ul class="main_tab">
            <li
              style="height: auto"
              v-for="(item, index) in tab"
              :key="index"
              class="item_title"
              @click="changeDisease(index)"
            >
              {{ item }}
              <div :class="{ active: diseaseId == index }"></div>
            </li>
          </ul>
          <div class="scrollbar">
            <!-- 望诊 -->
            <ul v-show="diseaseId == 0">
              <li v-for="(item, index) in diseasesWatch" :key="index">
                <div
                  v-for="(i, index) in diseasesWatchData"
                  :key="index"
                  v-show="i.id == item"
                >
                  <span>{{ i.name }}</span>
                  <p></p>
                  {{ i.answer }}
                </div>
              </li>
            </ul>
            <!-- 闻诊 -->
            <ul v-show="diseaseId == 1">
              <li v-for="(item, index) in diseasesListenth" :key="index">
                <div
                  v-for="(i, index) in diseasesListenthData"
                  :key="index"
                  v-show="i.id == item"
                >
                  <span>{{ i.name }}</span>
                  <p></p>
                  {{ i.answer }}
                </div>
              </li>
            </ul>
            <!-- 问诊 -->
            <ul v-show="diseaseId == 2" class="ask">
              <li v-for="(item, index) in diseasesAsk" :key="index">
                <div
                  v-for="(i, index) in diseasesAskData"
                  :key="index"
                  v-show="i.id == item"
                >
                  <span>问: {{ i.answer }}</span>
                  <span> 答: {{ i.question }}</span>
                </div>
              </li>
            </ul>
            <!-- 切诊 -->
            <ul v-show="diseaseId == 3">
              <li v-if="pulseData.answer">
                <span>脉诊</span>
                <p></p>
                {{ pulseData.answer }}
              </li>
              <li v-for="(item, index) in diseasesPress" :key="index">
                <div
                  v-for="(i, index) in diseasesPressData"
                  :key="index"
                  v-show="i.id == item"
                >
                  <span>{{ i.name }}</span>
                  <p></p>
                  {{ i.answer }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-treatment",
  data() {
    return {
      tab: ["望", "闻", "问", "切"],
      typeId: "",
      diseaseId: "",
      caseId: "",
      treatData: {},
      treatShow: false,
      searchTreat: "",
      agentiaData: {},
      searchAgentia: "",
      agentiaShow: false,
      agentiaList: [],
      agentiaId: [],
      diseasesWatchData: [],
      diseasesWatch: [],
      diseasesListenthData: [],
      diseasesListenth: [],
      diseasesPressData: [],
      diseasesPress: [],
      diseasesPulseData: [],
      diseasesAskData: [],
      diseasesAsk: [],
      watchData: [],
      listenData: [],
      pressData: [],
      pulseData: {},
      diseasesRadio: [],
      askData: [],
      diseaseName: "",
      defaultOptions: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getTreatVal();
    this.getdiseaseData();
  },
  methods: {
    seeItem(index) {
      this.typeId = index;
    },
    changeDisease(index) {
      this.diseaseId = index;
    },
    //获取方剂正确答案
    getTreatVal() {
      this.agentiaList = [];
      this.axios.get(`/case/manage/${this.caseId}/treat`).then((res) => {
        this.searchTreat = res.data.treatName;
        this.searchAgentia = res.data.agentias[0].name;
        this.agentiaId = res.data.agentias[0].id;
        let druggeries = res.data.agentias[0].druggeries;
        let arr = [];
        for (let i = 0; i < druggeries.length; i++) {
          arr.push(druggeries[i].name);
          if (arr.length % 6 == "0") {
            this.agentiaList.push(arr);
            arr = [];
          }
        }
        if (arr.length > 0) {
          this.agentiaList.push(arr);
        }
      });
    },
    timerOuttreat() {
      setTimeout(() => {
        this.treatShow = false;
      }, 500);
    },
    timerOutagentia() {
      setTimeout(() => {
        this.agentiaShow = false;
      }, 500);
    },
    //设置治则治法正确答案
    treatVal(e) {
      this.searchTreat = e.name;
      this.axios
        .post(`/case/manage/${this.caseId}/treat`, {
          name: e.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改治则治法成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },

    //设置方剂正确答案
    agentiaVal(e) {
      if (!this.agentiaList.name) {
        this.axios
          .delete(`/case/manage/${this.caseId}/treat/agentia/${this.agentiaId}`)
          .then(() => {
            this.searchAgentia = e.name;
            this.axios
              .put(`/case/manage/${this.caseId}/treat/agentia/${e.id}`)
              .then((res) => {
                if (res.code == "000000") {
                  this.$Message.warning("更改方剂成功!");
                  this.getTreatVal();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          });
        return;
      }
      this.searchAgentia = e.name;
      this.axios
        .put(`/case/manage/${this.caseId}/treat/agentia/${e.id}`)
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改方剂成功!");
            this.getTreatVal();
          } else {
            this.$Message.error(res.msg);
          }
        });
      return;
    },

    // 辩证数据
    getdiseaseData() {
      this.axios
        .get(`/case/manage/${this.caseId}/disease`)
        .then((res) => {
          this.diseaseName = res.data.diseaseName;
          let watch = res.data.diseaseNameIssues[0].issueIds;
          let listen = res.data.diseaseNameIssues[1].issueIds;
          let ask = res.data.diseaseNameIssues[2].issueIds;
          let press = res.data.diseaseNameIssues[3].issueIds;
          this.diseasesRadio = res.data.diseases;
          this.defaultOptions = res.data.diseases[0];

          let arr = [];
          // 获取望诊数据
          for (let i = 0; i <= 2; i++) {
            this.axios
              .get(`/case/manage/${this.caseId}/watch/${i}`)
              .then((res) => {
                for (let i = 0; i < res.data.list.length; i++) {
                  arr.push(res.data.list[i]);
                }
                this.diseasesWatchData = arr;
                for (let i = 0; i < watch.length; i++) {
                  for (let y = 0; y < arr.length; y++) {
                    if (watch[i] == arr[y].id) {
                      if (this.watchData.indexOf(arr[y]) > "-1") {
                        continue;
                      } else {
                        this.watchData.push(arr[y]);
                      }
                    }
                  }
                }
              });
          }
          // 获取闻诊
          this.axios.get(`/case/manage/${this.caseId}/listen`).then((res) => {
            this.diseasesListenthData = res.data;
            for (let i = 0; i < listen.length; i++) {
              for (let y = 0; y < res.data.length; y++) {
                if (listen[i] == res.data[y].id) {
                  this.listenData.push(res.data[y]);
                }
              }
            }
          });
          // 获取问诊
          this.axios
            .get(`/case/manage/${this.caseId}/ask`, {
              params: {
                page: "1",
                size: "500",
              },
            })
            .then((res) => {
              this.diseasesAskData = res.data.rows;
              for (let i = 0; i < ask.length; i++) {
                for (let y = 0; y < res.data.rows.length; y++) {
                  if (ask[i] == res.data.rows[y].id) {
                    this.askData.push(res.data.rows[y]);
                  }
                }
              }
            });
          // 获取切诊=>按珍数据
          this.axios
            .get(`/case/manage/${this.caseId}/feel/press`)
            .then((res) => {
              this.diseasesPressData = res.data.list;
              for (let i = 0; i < press.length; i++) {
                for (let y = 0; y < res.data.list.length; y++) {
                  if (press[i] == res.data.list[y].id) {
                    this.pressData.push(res.data.list[y]);
                  }
                }
              }
            });
          // 获取切诊=>脉诊
          this.axios
            .get(`/case/manage/${this.caseId}/feel/pulse`)
            .then((res) => {
              if (res.data.answer) {
                this.pulseData = res.data;
              }
            });
        })
        .then(() => {
          this.seeDisease(this.defaultOptions);
        });
    },
    // 切诊查看数据
    seeDisease(e) {
     this.diseasesWatch=[]
     this.diseasesListenth=[]
     this.diseasesAsk=[]
     this.diseasesPress=[]
      for (let i = 0; i < e.issues.length; i++) {
        if (e.issues[i].stageId == "1") {
          this.diseasesWatch = e.issues[i].issueIds;
        }
        if (e.issues[i].stageId == "2") {
          this.diseasesListenth = e.issues[i].issueIds;
        }
        if (e.issues[i].stageId == "3") {
          this.diseasesAsk = e.issues[i].issueIds;
        }
        if (e.issues[i].stageId == "4") {
          this.diseasesPress = e.issues[i].issueIds;
        }
      }
    },
  },
  watch: {
    searchTreat: function () {
      this.axios
        .get("/meta/treat", {
          params: {
            name: this.searchTreat,
          },
        })
        .then((res) => {
          this.treatData = res.data;
        });
    },
    searchAgentia: function () {
      this.axios
        .get("/meta/agentia", {
          params: {
            name: this.searchAgentia,
          },
        })
        .then((res) => {
          this.agentiaData = res.data.rows;
        });
    },
  },
};
</script>

<style lang="scss">
.case_treatment {
  width: 100%;
  height: 100%;
  .treatment_layout {
    width: 100%;
    height: 100%;
    display: flex;
    .layout_left {
      width: 57%;
      height: 100%;
      border-right: 1px solid rgb(9, 124, 168);
      .title {
        font-size: 16px;
        width: 930px;
        border-bottom: 1px solid rgb(9, 124, 168);
        .search {
          padding-bottom: 25px;
          input {
            margin-top: 15px;
            width: 100%;
          }
          .search_down {
            width: 100%;
          }
        }
      }
      .layout_search {
        width: 930px;
        .search_top {
          display: flex;
          justify-content: space-between;
          height: 50px;
          align-items: center;
          align-content: center;
          a {
            text-decoration: none;
            color: rgb(255, 255, 255);
            font-size: 16px;
            position: relative;
            &::after {
              content: "";
              background: url("../../../assets/public/search.png") no-repeat
                center;
              width: 34px;
              height: 34px;
              position: absolute;
              left: -35px;
              top: -5px;
            }
          }
        }
      }
      .search_bottom {
        width: 930px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        .prescription {
          display: flex;
          align-items: center;
          .search {
            margin-left: 20px;
            input {
              width: 375px;
            }
            .search_down {
              width: 375px;
            }
          }
        }
      }
      .treatment_main {
        width: 930px;
        height: 503px;
        display: flex;
        margin-top: 25px;
        .main_left {
          width: 395px;
          border-right: 1px solid rgb(9, 124, 168);
          li {
            height: 40px;
            line-height: 40px;
          }
        }
        .main_right {
          width: 535px;
          ul {
            height: 500px;
            li {
              border-bottom: 1px solid rgb(9, 124, 168);
              height: 40px;
              line-height: 40px;
              width: 98%;
              margin-left: 2%;
              padding: 0 15px;
              display: flex;
              span {
                text-align: center;
                width: 80px;
              }
            }
          }
        }
      }
    }
    .layout_right {
      width: 42%;
      height: 100%;
      background-color: rgb(5, 61, 118, 0.3);
      border: 1px solid rgb(9, 124, 168);
      margin-left: 1%;
      .title {
        text-align: center;
        font-size: 16px;
        height: 60px;
        line-height: 60px;
      }
      .disease {
        background: url("../../../assets/public/diseaseBox.png") no-repeat
          center;
        background-size: 100% 100%;
        width: 96%;
        margin: 0 auto;
        margin-bottom: 30px;
        height: 310px;
        .disease_title {
          width: 98%;
          margin: 0 auto;
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
          border-bottom: 1px solid rgb(9, 124, 168);
          display: flex;
          div {
            margin-left: 10px;
          }
        }
        .main_tab {
          display: flex;
          position: relative;
          margin: 10px;
          .item_title {
            cursor: pointer;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-left: 20px;
            font-size: 18px;
            position: relative;
          }

          .active {
            position: absolute;
            width: 50px;
            bottom: -5px;
            left: 0;
            border: 3px solid rgb(0, 235, 255);
            border-radius: 3px;
          }
        }
        .scrollbar {
          ul {
            width: 96%;
            margin: 0 auto;
            height: 200px;
            overflow-y: auto;
            li {
              display: flex;
              line-height: 45px;
              height: 45px;
              padding-left: 15px;
              position: relative;
              div {
                display: flex;
              }
              p {
                width: 30px;
                margin: 0 10px;
                position: relative;
                &::after {
                  position: absolute;
                  content: "____";
                  bottom: 7px;
                }
              }
            }
          }
          .ask {
            li {
              padding-right: 5px;
              height: auto;
              line-height: 25px;
              display: flex;
              flex-direction: column;
              border-bottom: 1px solid rgb(9, 124, 168);
              div {
                display: flex;
                flex-direction: column;
              }
            }
          }
        }
      }
    }
  }
}
</style>