<template>
  <div class="case_cut">
    <div
      class="main_mask"
      style="height: 730px; width: 87.5%"
      v-show="optionShow"
    ></div>
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="case_left" style="width: 1000px">
        <case-header></case-header>
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
              <ul v-show="typeId == 0">
                <li style="border: none">
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li
                  v-for="(item, index) in pulseData.optinos"
                  :key="index"
                  style="display: flex; justify-content: flex-start"
                >
                  <div
                    class="item_cont"
                    v-for="(i, index) in item"
                    style="width: 117px"
                    :key="index"
                  >
                    <input
                      type="radio"
                      name="option"
                      style="margin-right: 20px"
                      v-model="answer"
                      :value="i.name"
                      @change="putPulse(i)"
                    />
                    <p
                      class="item_cont_title"
                      style="width: 70px"
                      @click="seeImg(i)"
                    >
                      {{ i.name }}
                    </p>
                  </div>
                </li>
              </ul>
              <ul v-show="typeId == 1">
                <li>
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li
                  style="border: 1px solid rgb(9, 124, 168); border-top: none"
                  v-for="(item, index) in pressData.list"
                  :key="index"
                  @click="editPress(item)"
                >
                  <div class="item_cont">
                    <span
                      style="
                        width: 200px;
                        border-right: 1px solid rgb(9, 124, 168);
                        line-height: 30px;
                      "
                      >{{ item.name }}</span
                    >
                    <span>{{ item.answer }}</span>
                  </div>
                  <!-- <div class="item_edit">
                    <input type="checkbox" />
                  </div> -->
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right" style="width: 620px" v-show="typeId == 0">
        <div class="case_right_title">
          <span>脉诊图片</span>
        </div>
        <img :src="imgsUrl" v-if="imgsUrl" alt="" class="seeimg" />
        <p class="seedesc">{{ imgDesc }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import caseOption from "../edit/caseOption";
import caseHeader from "../edit/caseHeader";
export default {
  name: "edit-look",
  components: {
    caseOption,
    caseHeader,
  },
  data() {
    return {
      tab: ["脉诊", "按诊"],
      typeId: "0",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      optionShow: false,
      answer: "",
      imgsUrl: "",
      imgDesc: "",
      caseId: "",
      pressData: {},
      pulseData: {},
      option: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getpressData();
    this.getpulseData();
  },
  methods: {
    container(i) {
      this.typeId = i;
    },
    upload() {
      this.route = this.$refs.file.value;
    },
    openCont() {
      this.edit_cont = true;
    },
    opneTips() {
      this.tips = true;
    },
    openDele() {
      this.allShow = true;
    },
    seeImg(e) {
      if (/localhost/.test(e.picUrl)) {
        this.imgsUrl = e.picUrl.replace(/localhost/, "101.132.150.87");
      } else {
        this.imgsUrl = this.$url + e.picUrl;
      }
      this.imgDesc = e.description;
    },
    editPress(e) {
      this.optionShow = true;
      this.option = e;
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/feel/press/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[1].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.getpressData();
          }
        });
    },
    getpressData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/press`).then((res) => {
        this.pressData = res.data;
      });
    },
    getpulseData() {
      this.axios.get(`/case/manage/${this.caseId}/feel/pulse`).then((res) => {
        this.pulseData.optinos = [];
        let arr = [];
        let flag = false;
        for (let i = 0; i < res.data.optinos.length; i++) {
          flag = false;
          arr.push(res.data.optinos[i]);
          if (i % 8 == "7") {
            this.pulseData.optinos.push(arr);
            arr = [];
            flag = true;
          }
        }
        if (!flag) {
          this.pulseData.optinos.push(arr);
        }
        this.answer = res.data.answer;
        res.data.optinos.forEach((item) => {
          if (res.data.answer == item.name) {
            this.imgsUrl = item.picUrl;
            this.imgDesc = item.description;
          }
        });
      });
    },
    putPulse(e) {
      console.log(e);
      this.http
        .put(
          `/case/manage/${this.caseId}/feel/pulse?${this.qs.stringify({
            answer: this.answer,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改答案成功!");
            if (/localhost/.test(e.picUrl)) {
              this.imgsUrl = e.picUrl.replace(/localhost/, "101.132.150.87");
            } else {
              this.imgsUrl = this.$url + e.picUrl;
            }
            this.imgDesc = e.description;
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>
<style lang="scss">
.case_cut {
  .case_right {
    img {
      margin: 50px 19px;
    }
  }
}
</style>