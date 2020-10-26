<template>
  <div class="case_treatment">
    <div class="treatment_layout">
      <div class="layout_left">
        <div class="title">
          <p>治则治法</p>
          <div class="search">
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
              <div class="search">
                <input
                  type="text"
                  class="text_box"
                  v-model="searchAgentia"
                  @focus="agentiaShow = true"
                  @blur="timerOutagentia"
                />
                <div class="search_down scrollbar" v-show="agentiaShow">
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
              <li
                v-for="(item, index) in agentiaList.druggeries"
                :key="index"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="layout_right">
        <div class="title">辩证依据</div>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-treatment",
  data() {
    return {
      caseId: "",
      treatData: {},
      treatShow: false,
      searchTreat: "",
      agentiaData: {},
      searchAgentia: "",
      agentiaShow: false,
      agentiaList: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getTreatVal();
  },
  methods: {
    //获取治则治法正确答案
    getTreatVal() {
      this.axios.get(`/case/manage/${this.caseId}/treat`).then((res) => {
        this.searchTreat = res.data.treatName;
        this.searchAgentia = res.data.agentias[0].name;
        this.agentiaList = res.data.agentias[0];
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
      this.searchAgentia = e.name;
      this.axios
        .put(`/case/manage/${this.caseId}/treat/agentia/${e.id}`)
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改方剂成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
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
      console.log(1111);
      this.axios
        .get("/meta/agentia", {
          params: {
            name: this.searchAgentia,
          },
        })
        .then((res) => {
          console.log(res);
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
          li {
            border-bottom: 1px solid rgb(9, 124, 168);
            height: 40px;
            line-height: 40px;
            width: 98%;
            margin-left: 2%;
            padding: 0 15px;
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
      ul {
        width: 98%;
        margin: 0 auto;
        li {
          width: 100%;
          height: 300px;
          background: url("../../../assets/public/diseaseBox.png") no-repeat
            center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>