<template>
  <div class="case_look">
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
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
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in watchData"
                  :key="index"
                >
                  <div class="item_cont" @click="openOption(item)">
                    <p class="item_cont_title">{{ item.name }}</p>
                    <p class="item_cont_option">{{ item.answer }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <!-- <div class="case_right">
        <div class="case_right_title">
          <span>添加图片</span>
        </div>
        <div class="case_right_cont">
          <div class="main_mask" v-if="imgurl">
            <img :src="imgurl" accept="image/*" alt="" class="userlogo" />
          </div>
          <div class="case_right_cont_upload">
            <div class="case_right_cont_upload_img">
              <img src="../../../assets/public/uploadImg.png" alt="" />
              <span>请选择图片</span>
            </div>
            <input type="file" ref="imgs" @change="importimg" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import caseHeader from "../../teacher/edit/caseHeader";
import caseOption from "../../teacher/edit/caseOption";
export default {
  name: "user-look",
  components: {
    caseHeader,
    caseOption,
  },
  data() {
    return {
      tab: ["望神色形态", "望局部", "望舌"],
      optionShow: false,
      caseId: "",
      examNo: "",
      typeId: "0",
      caseData: {},
      watchData: {},
      option: {},
      id: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getwatchdata();
  },
  methods: {
    container(i) {
      this.typeId = i;
      this.getwatchdata();
    },
    getwatchdata() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/watch/${this.typeId}`)
        .then((res) => {
          this.watchData = res.data.list;
        });
    },
    openOption(e) {
      console.log(e);
      this.id = e.id;
      this.option = e;
      this.optionShow = true;
    },
    editcaseData() {
      console.log(this.$children[1].radioData);
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/watch/${this.id}`, {
          answer: this.$children[1].radioData,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>