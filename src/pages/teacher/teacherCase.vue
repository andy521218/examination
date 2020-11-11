<template>
  <div class="teacher case">
    <div class="main_mask" v-if="mask"></div>
    <!-- 删除案例 -->
    <edit-dele v-if="deleshow" :title="`删除案例`" @deleSubmit="deleSubmit">
      <template v-slot:edit_p>
        <p>确定删除案例?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 设为考核案例 -->

    <edit-dele :title="`设为考核案例`" @deleSubmit="addExam" v-if="allShow">
      <template v-slot:edit_p>
        <p>确定将选中的案例设为考核案例?</p>
        <p class="edit_dele_p">(设置后无法更改)</p>
      </template>
    </edit-dele>

    <edit-dele :title="`设为训练案例`" @deleSubmit="addTrain" v-if="trainshow">
      <template v-slot:edit_p>
        <p>确定将选中的案例设为训练案例?</p>
        <p class="edit_dele_p">(设置后无法更改)</p>
      </template>
    </edit-dele>
    <!-- 新增案例 -->
    <add-case v-if="addCase" :list="list" @getManage="getManage"></add-case>
    <div class="main_header">
      <button class="add" @click="add">新增案例</button>
      <button class="add_case one" @click="addAssessment">设为考核案例</button>
      <button class="add_case two" @click="addAssessTrain">设为训练案例</button>
      <label for>病系</label>
      <select v-model="diseaseType" class="select">
        <option value>请选择病系</option>
        <option v-for="(item, index) in list" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <label for>分类</label>
      <select v-model="searchOptions" class="select">
        <option value="">请选择分类</option>
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.upName"
        >
          {{ item.name }}
        </option>
      </select>
      <button class="submit" @click="getManage('1')">检索</button>
    </div>
    <div class="main_table">
      <ul class="caseList">
        <li v-for="(item, index) in manageData" :key="index">
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input
                type="radio"
                v-model="check"
                name="caseId"
                @change="getRadiodata(item)"
                :value="item.caseId"
              />
              <div class="state_item">
                <div class="item_one" v-if="!item.complete">未完成</div>
                <div class="item_draft" v-if="item.draft">草稿</div>
                <div class="item_two" v-if="item.train">训</div>
                <div class="item_three" v-if="item.exam">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit" @click="link(item)">
                <i></i>
                编 辑
              </span>
              <span class="bottom_dele" @click="dele(item)">
                <i></i>
                删 除
              </span>
            </div>
          </div>
          <div class="case_bottom">
            <span>姓名: {{ item.name }}</span>
            <span>性别: {{ item.gender ? "男" : "女" }}</span>
            <span>年龄: {{ item.age }}岁</span>
          </div>
        </li>
      </ul>
    </div>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getManage"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editDele from "../../components/edit/editDele";
import addCase from "../../components/edit/addCase";
export default {
  name: "teacher-case",
  components: {
    turnPage,
    editDele,
    addCase,
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
      options: [
        {
          upName: "isExam",
          name: "考核案例",
        },
        {
          upName: "isTrain",
          name: "训练案例",
        },
        {
          upName: "isCompelete",
          name: "完成案例",
        },
        {
          upName: "Compelete",
          name: "未完成案例",
        },
      ],
      addCase: false,
      deleshow: false,
      allShow: false,
      text: "",
      itps: "",
      diseaseType: "",
      manageData: {},
      total: "",
      size: "10",
      caseId: "",
      mask: false,
      check: "",
      trainshow: false,
      searchOptions: "",
      radioData: {},
      screenWidth: "",
    };
  },
  mounted() {
    localStorage.removeItem("caseMenuId");
    this.getManage();
    let timeout;
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (this.screenWidth >= "1900") {
          this.size = "10";
          this.getManage();
        } else {
          this.size = "8";
          this.getManage();
        }
      }, 500);
    };
  },
  methods: {
    dele(e) {
      this.deleshow = true;
      this.mask = true;
      this.caseId = e.caseId;
    },
    deleSubmit() {
      this.axios.delete(`/case/manage/${this.caseId}`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("删除案例成功!");
          this.deleshow = false;
          this.mask = false;
          this.getManage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    add() {
      this.mask = true;
      this.addCase = true;
    },
    getRadiodata(item) {
      this.radioData = item;
    },
    addAssessTrain() {
      if (!this.check) return this.$Message.error("请选择一项案例!");
      this.trainshow = true;
    },
    addExam() {
      if (!this.radioData.complete)
        return this.$Message.error("当前案例未完成,不可以设置为考核案例!");
      this.axios.put(`/case/manage/${this.check}/exam`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("设为考核案例成功!");
          this.allShow = false;
          this.getManage();
        } else {
          this.$Message.error("案例未完成,不可以设置为考核案例!");
        }
      });
    },
    addTrain() {
      if (!this.radioData.complete)
        return this.$Message.error("当前案例未完成,不可以设置为训练案例!");
      this.axios.put(`/case/manage/${this.check}/train`).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("设为训练案例成功!");
          this.trainshow = false;
          this.getManage();
        } else {
          this.$Message.error("案例未完成,不可以设置为训练案例!");
        }
      });
    },
    getManage(page = "1") {
      let isExam = "",
        isTrain = "",
        isCompelete = "";
      if (this.searchOptions == "isExam") isExam = true;
      if (this.searchOptions == "isTrain") isTrain = true;
      if (this.searchOptions == "isCompelete") isCompelete = true;
      if (this.searchOptions == "Compelete") isCompelete = false;
      this.axios
        .get("/case/manage", {
          params: {
            diseaseType: this.diseaseType,
            isExam: isExam,
            isTrain: isTrain,
            isCompelete: isCompelete,
            size: this.size,
            page: page,
          },
        })
        .then((res) => {
          this.manageData = res.data.rows;
          this.total = res.data.total;
        });
    },
    addAssessment() {
      if (!this.check) return this.$Message.error("请选择一项案例!");
      this.allShow = true;
    },
    link(item) {
      if (!item.draft) {
        this.axios.post(`/case/manage/draft/${item.caseId}`).then((res) => {
          if (res.code == "000000") {
            localStorage.setItem("caseId", res.data);
            this.$router.push("/case");
            this.$Message.warning("开始修改案例!");
          } else {
            this.$Message.error(res.msg);
          }
        });
        return;
      }
      localStorage.setItem("caseId", item.caseId);
      this.$router.push("/case");
    },
  },

  watch: {},
};
</script>

