<template>
  <div class="teacher case" style="min-width: 1670px">
    <div class="main_mask" v-if="mask"></div>
    <!-- 删除案例 -->
    <edit-dele v-if="deleshow" :title="`删除案例`" @deleSubmit="deleSubmit">
      <template v-slot:edit_p>
        <p>确定删除案例?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <!-- 设为考核案例 -->

    <edit-dele :title="`设为考核案例`" v-if="allShow">
      <template v-slot:edit_p>
        <p>确定将选中的案例设为考核案例?</p>
        <p class="edit_dele_p">(设置后无法更改)</p>
      </template>
    </edit-dele>

    <!-- 新增案例 -->
    <add-case v-if="addCase" :list="list" @getManage="getManage"></add-case>
    <div class="main_header">
      <button class="add" @click="add">新增案例</button>
      <button class="add_case one" @click="addAssessment">设为考核案例</button>
      <button class="add_case two">设为训练案例</button>
      <label for>病系</label>
      <select v-model="diseaseType" class="select">
        <option value>请选择病系</option>
        <option v-for="(item, index) in list" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <label for>分类</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <ul class="caseList">
        <li v-for="(item, index) in manageData" :key="index">
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input type="checkbox" />
              <div class="state_item">
                <div class="item_one">未完成</div>
                <div class="item_two">训</div>
                <div class="item_three">考</div>
              </div>
            </div>
            <div class="bottom">
              <span class="bottom_edit" @click="link(item.caseId)">
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
            <span>{{ item.name }}</span>
            <span>性别: {{ item.gender ? "女" : "男" }}</span>
            <span>年龄: {{ item.age }}岁</span>
          </div>
        </li>
      </ul>
    </div>
    <turn-page
      class="admin_page"
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
    };
  },
  mounted() {
    this.getManage();
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
          this.mask = true;
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
    getManage(page = "1") {
      this.axios
        .get("/case/manage", {
          params: {
            diseaseType: this.diseaseType,
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
      this.allShow = true;
    },
    link(caseId) {
      this.$router.push("/case");
      localStorage.setItem("caseId", caseId);
    },
  },
};
</script>
