<template>
  <div class="case_dialectical">
    <div class="dialectical_layout_left" v-show="step">
      <div class="title">病史合成</div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="container(index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>

      <!-- 望诊 -->
      <div class="scrollbar" v-show="typeId == 0">
        <ul class="main_cont">
          <li
            v-for="(item, index) in wachData"
            :key="index"
            style="display: flex"
          >
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 闻诊 -->
      <div class="scrollbar" v-show="typeId == 1">
        <ul class="main_cont">
          <li
            v-for="(item, index) in listenData"
            :key="index"
            style="display: flex"
          >
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>

      <!-- 问诊 -->
      <div class="scrollbar" v-show="typeId == 2">
        <ul class="main_cont">
          <li
            v-for="(item, index) in askData"
            :key="index"
            style="display: flex"
          >
            {{ item.answer }}
            <p></p>
            {{ item.question }}
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li style="display: flex">
            脉诊
            <p></p>
            {{ pulseData }}
          </li>
          <li
            v-for="(item, index) in pressData"
            :key="index"
            style="display: flex"
          >
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
    </div>

    <div class="dialectical_layout_right" v-show="step">
      <ul>
        <li><p class="tips">提示:根据病史合成选择病名和症型</p></li>
        <li>病名</li>
        <li>
          <div class="search">
            <input
              type="text"
              class="text_box"
              v-model="searchDisease"
              @focus="diseaseNameShow = true"
              @blur="timerDiseaseout"
            />
            <div class="search_down scrollbar">
              <div class="search_down_cont" v-show="diseaseNameShow">
                <div
                  class="search_item"
                  v-for="(item, index) in diseaseNameData"
                  :key="index"
                  @click="diseaseVal(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li>证型</li>
        <li class="layout">
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
          <div>
            <input type="checkbox" style="width: 22px; height: 22px" />
            <label for="">肝郁气滞证</label>
          </div>
        </li>
      </ul>
      <button class="edit_submit" @click="changeView">下一步</button>
    </div>

    <!-- 步骤2 -->
    <div class="dialectical_layout_left_two" v-show="!step">
      <div class="title">病名:肝郁气滞证</div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="container(index)"
        >
          {{ item }}
          <div :class="{ active: typeId == index }"></div>
        </li>
      </ul>
      <div class="scrollbar">
        <ul class="main_cont">
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
        </ul>
      </div>
    </div>
    <div class="dialectical_layout_right_two" v-show="!step">
      <div class="title">
        病名:
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
        <div>
          <input type="checkbox" />
          <label for="">症型1</label>
        </div>
      </div>
      <div class="scrollbar">
        <ul class="main_cont">
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
          <li><input type="checkbox" /> 您有什么地方不舒服?---- 自觉心慌</li>
        </ul>
      </div>
    </div>
    <button class="edit_submit" @click="changeView" v-show="!step">
      上一步
    </button>
  </div>
</template>

<script>
export default {
  name: "edit-dialectical",
  data() {
    return {
      tab: ["望", "闻", "问", "切"],
      diseaseNameShow: false,
      caseId: "",
      typeId: "",
      step: true,
      listenData: {},
      askData: [],
      pressData: {},
      pulseData: {},
      searchDisease: "",
      diseaseNameData: {},
      wachData: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getListendata();
    this.getAskdata();
    this.getPressData();
    this.getPulseData();
    // 获取望诊数据
    for (let i = 0; i < 3; i++) {
      this.axios.get(`/case/manage/${this.caseId}/watch/${i}`).then((res) => {
        this.wachData.push(res.data.list);
        this.wachData = this.wachData.flat();
      });
    }
  },
  methods: {
    container(i) {
      this.typeId = i;
    },
    changeView() {
      this.step = !this.step;
    },
    timerDiseaseout() {
      setTimeout(() => {
        this.diseaseNameShow = false;
      }, 500);
    },
    // 获取闻诊数据
    getListendata() {
      this.axios.get(`/case/manage/${this.caseId}/listen`).then((res) => {
        this.listenData = res.data;
      });
    },
    //获取问诊数据
    getAskdata() {
      this.axios
        .get(`/case/manage/${this.caseId}/ask`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          let data = res.data.rows;
          data.forEach((item) => {
            if (!item.correct) {
              this.askData.push(item);
            }
          });
        });
    },
    //获取按诊数据
    getPressData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/press`).then((res) => {
        this.pressData = res.data.list;
      });
    },
    //获取脉诊数据
    getPulseData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/pulse`).then((res) => {
        this.pulseData = res.data.answer;
      });
    },
    // 设置正确病名
    diseaseVal(e) {
      this.searchDisease = e.name;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        console.log(res);
      });
    },
  },
  watch: {
    searchDisease: function () {
      this.axios
        .get("/meta/disease/name", {
          params: {
            name: this.searchDisease,
          },
        })
        .then((res) => {
          this.diseaseNameData = res.data;
        });
    },
  },
};
</script>

<style lang="scss">
.case_dialectical {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .dialectical_layout_left {
    width: 55%;
    height: 100%;
    background-color: rgb(5, 61, 118, 0.3);
    border: 1px solid rgb(9, 124, 168);
    .title {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
    }
  }
  .dialectical_layout_right {
    width: 44%;
    height: 100%;
    position: relative;
    margin-left: 1%;
    border-left: 2px solid rgb(9, 124, 168);
    ul {
      width: 97%;
      margin-left: 3%;
      li {
        margin-top: 20px;
        .tips {
          float: right;
        }
        .search {
          position: relative;
          input {
            width: 100%;
          }
          .search_down {
            width: 100%;
          }
        }
      }
      .layout {
        display: flex;
        flex-wrap: wrap;
        div {
          margin-bottom: 20px;
          width: 175px;
        }
      }
    }
  }

  .dialectical_layout_left_two,
  .dialectical_layout_right_two {
    width: 49%;
    height: 90%;
    background: url("../../../assets/public/contbg.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      padding-left: 45px;
      display: flex;
      border-bottom: 1px solid rgb(9, 124, 168);
      div {
        width: 100px;
        margin-left: 15px;
      }
    }
    .main_tab {
      margin: 0;
    }
  }

  .dialectical_layout_left_two {
    margin-right: 2%;
  }

  //   公共样式
  .edit_submit {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .main_tab {
    display: flex;
    margin-top: 25px;
    position: relative;
    margin-left: 15px;

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
  .main_cont {
    width: 98%;
    height: 585px;
    overflow-y: auto;
    margin: 20px auto;
    li {
      line-height: 45px;
      height: 45px;
      padding-left: 15px;
      position: relative;
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
}
</style>


