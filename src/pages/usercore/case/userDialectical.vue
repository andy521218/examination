<template>
  <div class="case_dialectical">
    <div class="dialectical_layout_left" v-show="step">
      <div class="title">病史合成</div>
      <ul class="main_tab">
        <li
          style="height: auto"
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="seeTabdata(item, index)"
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
            <span style="width: 50px">
              {{ item.name }}
            </span>
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
            style="
              display: flex;
              flex-direction: column;
              height: auto;
              line-height: 30px;
              border-bottom: 1px solid #097ca8;
            "
          >
            <span class="start">问: {{ item.question }}</span>
            <span class="end">答: {{ item.answer }}</span>
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li style="display: flex" v-if="pulseData.answer">
            <span style="width: 50px"> 脉诊 </span>
            <p></p>
            {{ pulseData.answer }}
          </li>
          <li
            v-for="(item, index) in pressData"
            :key="index"
            style="display: flex"
          >
            <span style="width: 50px">
              {{ item.name }}
            </span>
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
        <li>症型</li>
        <li class="layout">
          <div v-for="(item, index) in diseaseCheckData" :key="index">
            <input
              type="checkbox"
              style="width: 22px; height: 22px"
              v-model="diseaseCheckArr"
              :value="item"
              @change="changeDiseasechkeck($event, item)"
            />
            <label for="">{{ item.name }}</label>
          </div>
        </li>
      </ul>
      <button class="edit_submit" @click="changeView">下一步</button>
    </div>

    <!-- 步骤2 -->
    <div class="dialectical_layout_left_two" v-show="!step">
      <div class="title">
        病名:{{ searchDisease }}
        <p style="float: right; margin-right: 20px">
          选中答案后,单击当前项设置
        </p>
      </div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="container(item, index)"
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
            <input type="checkbox" :value="item.id" v-model="nameWatchData" />
            <span style="width: 50px">
              {{ item.name }}
            </span>
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
            <input type="checkbox" :value="item.id" v-model="namelistenData" />
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
            style="
              height: auto;
              line-height: 30px;
              display: flex;
              border-bottom: 1px solid #097ca8;
            "
          >
            <div>
              <input type="checkbox" :value="item.id" v-model="nameAskData" />
            </div>
            <div style="display: flex; flex-direction: column">
              <span class="start" style="height: auto"
                >问:{{ item.question }}</span
              >
              <span class="end">答:{{ item.answer }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li style="display: flex" v-if="pulseData.answer">
            <input
              type="checkbox"
              :value="pulseData.id"
              v-model="namePressData"
            />
            <span style="width: 50px"> 脉诊 </span>
            <p></p>
            {{ pulseData.answer }}
          </li>
          <li
            v-for="(item, index) in pressData"
            :key="index"
            style="display: flex"
          >
            <input type="checkbox" :value="item.id" v-model="namePressData" />
            <span style="width: 50px">
              {{ item.name }}
            </span>
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="dialectical_layout_right_two" v-show="!step">
      <div class="title" style="display: flex">
        症候:
        <div v-for="(item, index) in diseaseCheckArr" :key="index">
          <input
            type="radio"
            name="disease"
            :value="item.id"
            @change="seeDisease(item)"
            v-model="diseaseUpdata.id"
          />
          <label for="">{{ item.name }}</label>
        </div>
      </div>
      <ul class="main_tab">
        <li
          v-for="(item, index) in tab"
          :key="index"
          class="item_title"
          @click="changeDisease(item, index)"
        >
          {{ item }}
          <div :class="{ active: diseaseChangeId == index }"></div>
        </li>
      </ul>
      <!-- 望诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 0">
        <ul class="main_cont">
          <li
            v-for="(item, index) in wachData"
            :key="index"
            style="display: flex"
          >
            <input
              type="checkbox"
              :value="item.id"
              v-model="diseaseWatchData"
            />
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>
      <!-- 闻诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 1">
        <ul class="main_cont">
          <li
            v-for="(item, index) in listenData"
            :key="index"
            style="display: flex"
          >
            <input
              type="checkbox"
              :value="item.id"
              v-model="diseaselistenData"
            />
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
        </ul>
      </div>

      <!-- 问诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 2">
        <ul class="main_cont">
          <li
            v-for="(item, index) in askData"
            :key="index"
            style="
              height: auto;
              line-height: 30px;
              display: flex;
              border-bottom: 1px solid #097ca8;
            "
          >
            <input type="checkbox" :value="item.id" v-model="diseaseAskData" />
            <div style="display: flex; flex-direction: column">
              <span class="start" style="height: auto"
                >问:{{ item.question }}</span
              >
              <span class="end">答:{{ item.answer }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 切诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 3">
        <ul class="main_cont">
          <li style="display: flex" v-if="pulseData.answer">
            <input
              type="checkbox"
              :value="pulseData.id"
              v-model="diseasePressData"
            />
            脉诊
            <p></p>
            {{ pulseData.answer }}
          </li>
          <li
            v-for="(item, index) in pressData"
            :key="index"
            style="display: flex"
          >
            <input
              type="checkbox"
              :value="item.id"
              v-model="diseasePressData"
            />
            {{ item.name }}
            <p></p>
            {{ item.answer }}
          </li>
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
  name: "user-dialectical",
  data() {
    return {
      tab: ["望", "闻", "问", "切"],
      diseaseNameShow: false,
      caseId: "",
      typeId: "",
      examNo: "",
      step: true,
      listenData: [],
      askData: [],
      pressData: [],
      pulseData: [],
      searchDisease: "",
      diseaseNmaeId: "",
      diseaseNameData: {},
      wachData: [],
      diseaseCheckData: {},
      diseaseUpdata: {},
      diseaseCheckArr: [],
      diseaseChangeId: "",
      nameWatchData: [],
      namelistenData: [],
      nameAskData: [],
      namePressData: [],
      diseaseWatchData: [],
      diseaselistenData: [],
      diseaseAskData: [],
      diseasePressData: [],
      diseasecorrectData: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getListendata();
    this.getAskdata();
    this.getPressData();
    this.getPulseData();
    this.getAlldata();
    // this.setupRadio();
    // 获取望诊数据
    for (let i = 0; i < 3; i++) {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/watch/${i}`)
        .then((res) => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].answer) {
              this.wachData.push(res.data.list[i]);
            }
          }
        });
    }
  },
  methods: {
    // 第一步查看tab选项
    seeTabdata(item, i) {
      this.typeId = i;
    },
    // 下一步
    changeView() {
      if (!this.searchDisease) return this.$Message.error("请先选择病名");
      if (this.diseaseCheckArr.length == "0")
        return this.$Message.error("至少选择一项症型");
      this.step = !this.step;
    },
    timerDiseaseout() {
      setTimeout(() => {
        this.diseaseNameShow = false;
      }, 500);
    },
    // 症型checkbox
    changeDiseasechkeck(e, item) {
      if (e.target.checked) {
        this.http.put(`/case/manage/${this.caseId}/disease`, {
          id: item.id,
          issues: [
            {
              issueIds: [],
              stageId: "",
            },
          ],
          name: item.name,
        });

        return;
      }
      this.axios.delete(`/case/manage/${this.caseId}/disease/${item.id}`);
    },
    // 获取闻诊数据
    getListendata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/listen`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].answer) {
              this.listenData.push(res.data[i]);
            }
          }
        });
    },
    //获取问诊数据
    getAskdata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/asks`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.askData = res.data.rows;
        });
    },
    //获取按诊数据
    getPressData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/press`)
        .then((res) => {
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].answer) {
              this.pressData.push(res.data.list[i]);
            }
          }
        });
    },
    //获取脉诊数据
    getPulseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
        .then((res) => {
          if (res.data.answer) {
            this.pulseData = res.data;
          }
        });
    },
    // search正确病名
    diseaseVal(e) {
      this.searchDisease = e.name;
      this.diseaseNmaeId = e.id;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        this.diseaseCheckData = res.data.rows;
      });
      //设置更改病名
      this.http.post(
        `/answer/${this.examNo}/${this.caseId}/diseasename/${e.id}`,
        [
          {
            issueIds: [2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433],
            stageId: 1,
          },
          {
            issueIds: [831, 832, 839, 840],
            stageId: 2,
          },
          {
            issueIds: [159, 160, 161, 162],
            stageId: 3,
          },
          {
            issueIds: [0],
            stageId: 4,
          },
        ]
      );
    },
    // 设置病名各项答案
    container(item, i) {
      this.typeId = i;
      let issueIds = [];
      let stageId = "";
      if (item == "望") {
        issueIds = this.nameWatchData;
        stageId = "1";
      }
      if (item == "闻") {
        issueIds = this.namelistenData;
        stageId = "2";
      }
      if (item == "问") {
        issueIds = this.nameAskData;
        stageId = "3";
      }
      if (item == "切") {
        issueIds = this.namePressData;
        issueIds.push("8");
        stageId = "4";
      }
      if (issueIds.length == "0") return;
      this.http
        .post(`/case/manage/${this.caseId}/disease/name`, {
          id: this.diseaseNmaeId,
          issues: [
            {
              issueIds: issueIds,
              stageId: stageId,
            },
          ],
          name: this.searchDisease,
        })
        .then((res) => {
          if (res.data) {
            this.$Message.warning(`设置${this.searchDisease + item}诊成功!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 症候单选项
    seeDisease(e) {
      this.diseaseUpdata = e;
      this.diseasecorrectData.forEach((item) => {
        if (e.id == item.id) {
          item.issues.forEach((issueIds) => {
            if (issueIds.stageId == "1") {
              this.diseaseWatchData = issueIds.issueIds;
            }
            if (issueIds.stageId == "2") {
              this.diseaselistenData = issueIds.issueIds;
            }
            if (issueIds.stageId == "3") {
              this.diseaseAskData = issueIds.issueIds;
            }
            if (issueIds.stageId == "4") {
              this.diseasePressData = issueIds.issueIds;
            }
          });
        }
      });
    },
    //设置症候答案
    changeDisease(item, i) {
      this.diseaseChangeId = i;
      let issueIds = [];
      let stageId = "";
      if (item == "望") {
        issueIds = this.diseaseWatchData;
        stageId = "1";
      }
      if (item == "闻") {
        issueIds = this.diseaselistenData;
        stageId = "2";
      }
      if (item == "问") {
        issueIds = this.diseaseAskData;
        stageId = "3";
      }
      if (item == "切") {
        issueIds = this.diseasePressData;
        stageId = "4";
      }
      if (issueIds.length == "0") return;
      if (!this.diseaseUpdata.name)
        return this.$Message.error("请选择一项症候!");
      this.http
        .put(`/case/manage/${this.caseId}/disease`, {
          id: this.diseaseUpdata.id,
          issues: [
            {
              issueIds: issueIds,
              stageId: stageId,
            },
          ],
          name: this.diseaseUpdata.name,
        })
        .then((res) => {
          if (res.data) {
            this.$Message.warning(`设置${this.diseaseUpdata.name + item}成功!`);
            this.getAlldata();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    //设置默认症候选项
    setupRadio() {
      this.axios.get(`/${this.examNo}/${this.caseId}/disease`).then((res) => {
        this.diseaseUpdata.id = res.data.diseases[0].id;
        this.diseaseUpdata.name = res.data.diseases[0].name;
        res.data.diseases[0].issues.forEach((issueIds) => {
          if (issueIds.stageId == "1") {
            this.diseaseWatchData = issueIds.issueIds;
          }
          if (issueIds.stageId == "2") {
            this.diseaselistenData = issueIds.issueIds;
          }
          if (issueIds.stageId == "3") {
            this.diseaseAskData = issueIds.issueIds;
          }
          if (issueIds.stageId == "4") {
            this.diseasePressData = issueIds.issueIds;
          }
        });
      });
    },
    //获取全部信息
    getAlldata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/disease`)
        .then((res) => {
          if (!res.data.diseaseName) return;
          //获取正确病名 症型选项
          this.searchDisease = res.data.diseaseName;
          this.diseaseNmaeId = res.data.diseaseNameId;
          let arr = JSON.parse(JSON.stringify(res.data.diseases));
          arr.forEach((item) => {
            delete item["issues"];
          });
          this.diseaseCheckArr = arr;
          this.axios
            .get(`/meta/disease/${res.data.diseaseNameId}`)
            .then((res) => {
              this.diseaseCheckData = res.data.rows;
            });
          //获取正确望闻问切选项(病名)
          res.data.diseaseNameIssues.forEach((item) => {
            if (item.stageId == "1") {
              this.nameWatchData = item.issueIds;
            }
            if (item.stageId == "2") {
              this.namelistenData = item.issueIds;
            }
            if (item.stageId == "3") {
              this.nameAskData = item.issueIds;
            }
            if (item.stageId == "4") {
              this.namePressData = item.issueIds;
            }
          });
          //获取正确症候选项
          this.diseasecorrectData = res.data.diseases;
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
    .main_cont {
      height: 500px;
      li {
        display: flex;
        align-items: center;
        p {
          &::after {
            bottom: -15px;
          }
        }
      }
    }
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