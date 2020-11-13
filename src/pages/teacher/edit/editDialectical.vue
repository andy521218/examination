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
      <!-- 问诊 -->
      <div class="scrollbar" v-show="typeId == 0">
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

      <!-- 望诊 -->
      <div class="scrollbar" v-show="typeId == 1">
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
      <div class="scrollbar" v-show="typeId == 2">
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
      <!-- 问诊 -->
      <div class="scrollbar" v-show="typeId == 0">
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
      <!-- 望诊 -->
      <div class="scrollbar" v-show="typeId == 1">
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
      <div class="scrollbar" v-show="typeId == 2">
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
      <!-- 切诊 -->
      <div class="scrollbar" v-show="typeId == 3">
        <ul class="main_cont">
          <li style="display: flex">
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
        <div v-for="(item, index) in diseaseCheckArr1" :key="index">
          <input
            type="radio"
            name="disease"
            :value="item.id"
            v-model="diseaseDeafault"
            @change="seeDisease(item)"
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
      <!-- 问诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 0">
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
      <!-- 望诊 -->
      <div class="scrollbar" v-show="diseaseChangeId == 1">
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
      <div class="scrollbar" v-show="diseaseChangeId == 2">
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
  name: "edit-dialectical",
  data() {
    return {
      tab: ["问", "望", "闻", "切"],
      diseaseNameShow: false,
      caseId: "",
      typeId: "",
      step: true,
      listenData: [],
      askData: [],
      pressData: [],
      pulseData: [],
      searchDisease: "",
      diseaseNameId: "",
      diseaseNameData: {},
      wachData: [],
      diseaseCheckData: {},
      diseaseDeafault: [],
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
      diseaseCheckArr1: [],
      uploadName: {
        id: "",
        issues: [
          {
            issueIds: [],
            stageId: 1,
          },
          {
            issueIds: [],
            stageId: 2,
          },
          {
            issueIds: [],
            stageId: 3,
          },
          {
            issueIds: [],
            stageId: 4,
          },
        ],
        name: "",
      },
      upDiseaseData: {
        id: "",
        issues: [
          {
            issueIds: [],
            stageId: 1,
          },
          {
            issueIds: [],
            stageId: 2,
          },
          {
            issueIds: [],
            stageId: 3,
          },
          {
            issueIds: [],
            stageId: 4,
          },
        ],
        name: "",
      },
    };
  },

  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getListendata();
    this.getAskdata();
    this.getPressData();
    this.getPulseData();
    this.getAlldata();
    this.getDiseaseDefault();
    // 获取望诊数据
    for (let i = 0; i < 3; i++) {
      this.axios.get(`/case/manage/${this.caseId}/watch/${i}`).then((res) => {
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
      if (this.step) {
        if (!this.searchDisease) return this.$Message.error("请先选择病名");
        if (this.diseaseCheckArr.length == "0")
          return this.$Message.error("至少选择一项症型");
        this.step = false;
        this.getDiseaseDefault();
      } else {
        this.getAlldata();
        this.diseaseWatchData = [];
        this.diseaselistenData = [];
        this.diseaseAskData = [];
        this.diseasePressData = [];
        this.step = true;
      }
      this.diseaseCheckArr1 = this.diseaseCheckArr;
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
      this.axios.get(`/case/manage/${this.caseId}/listen`).then((res) => {
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
        .get(`/case/manage/${this.caseId}/ask`, {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          if (!res.data.rows) return;
          let data = res.data.rows;
          data.forEach((item) => {
            if (item.correct) {
              this.askData.push(item);
            }
          });
        });
    },
    //获取按诊数据
    getPressData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/press`).then((res) => {
        for (let i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].answer) {
            this.pressData.push(res.data.list[i]);
          }
        }
      });
    },
    //获取脉诊数据
    getPulseData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/pulse`).then((res) => {
        if (res.data.answer) {
          this.pulseData = res.data;
        }
      });
    },
    // search正确病名
    diseaseVal(e) {
      this.searchDisease = e.name;
      this.diseaseNameId = e.id;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        this.diseaseCheckData = res.data.rows;
      });
      //设置更改病名
      this.http.post(`/case/manage/${this.caseId}/disease/name`, {
        id: e.id,
        issues: [
          {
            issueIds: [],
            stageId: "",
          },
        ],
        name: e.name,
      });
    },
    // 设置病名各项答案
    container(item, i) {
      this.typeId = i;
      if (item == "问") {
        this.checkNameData(this.nameAskData, item, "1");
      }
      if (item == "望") {
        this.checkNameData(this.nameWatchData, item, "2");
      }
      if (item == "闻") {
        this.checkNameData(this.namelistenData, item, "3");
      }
      if (item == "切") {
        this.checkNameData(this.namePressData, item, "4");
      }
    },
    //病名各项答案比对参数
    checkNameData(nameData, item, id) {
      if (nameData.length == "0") return;
      for (let i = 0; i < this.uploadName.issues.length; i++) {
        if (this.uploadName.issues[i].stageId == id) {
          if (this.uploadName.issues[i].issueIds == nameData) {
            return;
          }
          this.uploadName.issues[i].issueIds = nameData;
          this.upLoadname(item);
        }
      }
    },
    //病名各项上传函数
    upLoadname(item) {
      this.uploadName.id = this.diseaseNameId;
      this.uploadName.name = this.searchDisease;
      this.http
        .post(`/case/manage/${this.caseId}/disease/name`, this.uploadName)
        .then((res) => {
          if (res.data) {
            this.$Message.warning(`设置${this.searchDisease}--${item}诊成功!`);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 查看症候单选项
    seeDisease(e) {
      this.diseaseUpdata = e;
      this.getAlldata();
      let flag = false;
      try {
        this.diseasecorrectData.forEach((item) => {
          if (e.id == item.id) {
            flag = true;
            item.issues.forEach((issueIds) => {
              if (issueIds.stageId == "1") {
                this.diseaseAskData = issueIds.issueIds;
                this.upDiseaseData.issues[0].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "2") {
                this.diseaseWatchData = issueIds.issueIds;
                this.upDiseaseData.issues[1].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "3") {
                this.diseaselistenData = issueIds.issueIds;
                this.upDiseaseData.issues[2].issueIds = issueIds.issueIds;
              }
              if (issueIds.stageId == "4") {
                this.upDiseaseData.issues[3].issueIds = issueIds.issueIds;
                this.diseasePressData = issueIds.issueIds;
              }
            });
          }
        });
        if (!flag) {
          this.diseaseWatchData = [];
          this.diseaselistenData = [];
          this.diseaseAskData = [];
          this.diseasePressData = [];
          this.upDiseaseData = {
            id: "",
            issues: [
              { issueIds: [], stageId: "1" },
              { issueIds: [], stageId: "2" },
              { issueIds: [], stageId: "3" },
              { issueIds: [], stageId: "4" },
            ],
            name: "",
          };
        }
      } catch (error) {
        return error;
      }
    },
    //设置症候各项答案
    changeDisease(item, i) {
      this.diseaseChangeId = i;
      if (item == "望") {
        this.checkDisease(this.diseaseWatchData, item, i);
      }
      if (item == "闻") {
        this.checkDisease(this.diseaselistenData, item, i);
      }
      if (item == "问") {
        this.checkDisease(this.diseaseAskData, item, i);
      }
      if (item == "切") {
        this.checkDisease(this.diseasePressData, item, i);
      }
    },

    // 病症依据数据对比
    checkDisease(itemName, item, stageId) {
      if (!this.diseaseUpdata.name) return;
      for (let i = 0; i < this.upDiseaseData.issues.length; i++) {
        if (this.upDiseaseData.issues[i].stageId == stageId + 1) {
          if (
            itemName.toString() ==
            this.upDiseaseData.issues[i].issueIds.toString()
          ) {
            return;
          }
          this.upDiseaseData.issues[i].issueIds = itemName;
          return this.upDisease(item);
        }
      }
    },
    upDisease(e) {
      this.upDiseaseData.id = this.diseaseUpdata.id;
      this.upDiseaseData.name = this.diseaseUpdata.name;
      this.http
        .put(`/case/manage/${this.caseId}/disease`, this.upDiseaseData)
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning(`设置${this.diseaseUpdata.name}-${e}成功!`);
          }
        });
    },
    //获取病症默认选项
    getDiseaseDefault() {
      this.axios.get(`/case/manage/${this.caseId}/disease`).then((res) => {
        try {
          this.diseaseDeafault = res.data.diseases[0].id;
          this.diseasecorrectData.forEach((item) => {
            if (this.diseaseDeafault == item.id) {
              item.issues.forEach((issueIds) => {
                if (issueIds.stageId == "1") {
                  this.diseaseAskData = issueIds.issueIds;
                  this.upDiseaseData.issues[0].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "2") {
                  this.diseaseWatchData = issueIds.issueIds;
                  this.upDiseaseData.issues[1].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "3") {
                  this.diseaselistenData = issueIds.issueIds;
                  this.upDiseaseData.issues[2].issueIds = issueIds.issueIds;
                }
                if (issueIds.stageId == "4") {
                  this.upDiseaseData.issues[3].issueIds = issueIds.issueIds;
                  this.diseasePressData = issueIds.issueIds;
                }
              });
            }
          });
        } catch (error) {
          return error;
        }
      });
    },
    //获取全部信息
    getAlldata() {
      this.axios.get(`/case/manage/${this.caseId}/disease`).then((res) => {
        if (!res.data.diseaseName) return;
        //获取正确病名 症型选项
        this.searchDisease = res.data.diseaseName;
        this.diseaseNameId = res.data.diseaseNameId;
        let arr = JSON.parse(JSON.stringify(res.data.diseases));
        arr.forEach((item) => {
          delete item["issues"];
        });
        this.diseaseCheckArr = arr.sort((a, b) => {
          return a.id - b.id;
        });
        this.axios
          .get(`/meta/disease/${res.data.diseaseNameId}`)
          .then((res) => {
            this.diseaseCheckData = res.data.rows;
          });
        //获取正确望闻问切选项(病名)
        res.data.diseaseNameIssues.forEach((item) => {
          if (item.stageId == "1") {
            this.uploadName.issues[0].issueIds = item.issueIds;
            this.nameAskData = item.issueIds;
          }
          if (item.stageId == "2") {
            this.uploadName.issues[1].issueIds = item.issueIds;
            this.nameWatchData = item.issueIds;
          }
          if (item.stageId == "3") {
            this.uploadName.issues[2].issueIds = item.issueIds;
            this.namelistenData = item.issueIds;
          }
          if (item.stageId == "4") {
            this.uploadName.issues[3].issueIds = item.issueIds;
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


