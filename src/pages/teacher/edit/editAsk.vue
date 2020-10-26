<template>
  <div class="case_layout">
    <!-- 编辑弹窗 -->
    <case-problem
      v-if="edit_cont"
      :editData="editData"
      :typeId="typeId"
      @getaskData="getaskData"
    ></case-problem>
    <!-- 提示弹窗 -->
    <tips v-if="tips"></tips>
    <!-- 删除弹窗 -->
    <edit-dele v-if="allShow" :title="`删除`" @deleSubmit="deleSubmit">
      <template v-slot:edit_p>
        <p>确定删除本条信息吗?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <div class="case_left">
      <case-header :caseData="caseData"></case-header>
      <main>
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
          <i class="tips" @click="opneTips"></i>
        </ul>
        <div class="content scrollbar">
          <div class="content_scrollbar">
            <ul>
              <li v-for="(item, index) in askData" :key="index">
                <div class="item_cont">
                  <i
                    v-if="typeId == 1"
                    :style="{ background: select[item.colorId].color }"
                  ></i>
                  <span>{{ item.answer }}</span>
                  <span>{{ item.question }}</span>
                </div>
                <div class="item_edit">
                  <i class="icon_edit" @click="openCont(item)"></i>
                  <i class="icon_dele" @click="openDele(item)"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="content_bottom">
          <input type="checkbox" v-model="upDatacorrect" />
          <label for="">干扰项</label>
          <input
            type="text"
            class="text_box"
            v-model="answer"
            placeholder="请输入问题..."
            maxlength="30"
          />
          <p class="answer">{{ answer.length }}/30</p>
          <input
            type="text"
            class="text_box"
            v-model="question"
            placeholder="请输入答案.."
            maxlength="37"
          />
          <p class="question">{{ question.length }}/37</p>
          <button class="submit" @click="submit">添加</button>
        </div>
      </main>
    </div>
    <div class="case_right">
      <div class="case_right_title">
        <span>导入问诊问题及答案</span>
      </div>
      <div class="case_right_cont">
        <ul>
          <li>
            <i>*</i>
            <span>第一步:</span>
          </li>
          <li>
            <button class="submit">下载模板</button>
            <div class="case_rigt_tips">
              <span>请先下载Excel模板</span>
              <span>(已有模板请执行第二步)</span>
            </div>
          </li>
          <li>
            <i>*</i>
            <span>第二步:</span>
          </li>
          <li>
            <div class="upload">
              <button class="submit">选择文件</button>
              <input type="file" @change="upload()" ref="file" />
            </div>
            <div>
              <span>仅支持Excel文件</span>
            </div>
          </li>
          <li>
            <input type="text" disabled class="disabled" v-model="route" />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
        <div class="case_right_desc">
          <span>提示:</span>
          <span>
            1.下载问诊问题模板,在模板中输入问题及答案,上传模板后即可导入问诊数据
          </span>
          <span> 2.上传完成后可以在网页中直接修改 </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import caseProblem from "../edit/caseProblem";
import caseHeader from "../edit/caseHeader";
import tips from "../edit/tips";
import editDele from "../../../components/edit/editDele";
export default {
  name: "edit-look",
  components: {
    caseProblem,
    tips,
    editDele,
    caseHeader,
  },
  data() {
    return {
      tab: ["主诉", "现病史", "疾病史", "个人史", "婚育史", "家族史"],
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
      typeId: "0",
      itemid: "",
      upDatacorrect: false,
      caseId: "",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      answer: "",
      question: "",
      askData: {},
      editData: {},
      caseData: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getaskData();
    this.getcaseData();
  },
  methods: {
    container(i) {
      this.typeId = i;
      this.getaskData();
    },
    upload() {
      this.route = this.$refs.file.value;
    },
    openCont(e) {
      this.editData = e;
      this.edit_cont = true;
    },
    opneTips() {
      this.tips = true;
    },
    openDele(e) {
      this.allShow = true;
      this.itemid = e.id;
    },
    deleSubmit() {
      this.axios
        .delete(`/case/manage/${this.caseId}/ask/${this.itemid}`)
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("删除成功!");
            this.getaskData();
            this.allShow = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    submit() {
      if (!this.answer) return this.$Message.error("请输入问题!");
      if (!this.question) return this.$Message.error("请输入答案!");
      this.http
        .post(`/case/manage/${this.caseId}/ask`, {
          answer: this.answer,
          colorId: "4",
          correct: this.upDatacorrect,
          question: this.question,
          typeId: this.typeId,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.answer = "";
            this.question = "";
            this.upDatacorrect = false;
            this.getaskData();
            this.$Message.warning("添加成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    getcaseData() {
      this.axios.get(`/case/${this.caseId}`).then((res) => {
        this.caseData = res.data;
        this.caseData.diseaseTypeName = this.list[res.data.diseaseType].name;
      });
    },
    getaskData() {
      this.axios
        .get(`/case/${this.caseId}/ask`, {
          params: {
            page: "1",
            size: "500",
            typeId: this.typeId,
          },
        })
        .then((res) => {
          if (res.code == "000000") {
            this.askData = res.data.rows;
          }
        });
    },
  },
};
</script>
