<template>
  <div class="case_hear">
    <case-option
      :option="option"
      v-if="optionShow"
      :radioName="radioName"
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
            <i class="tips"></i>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in listenData"
                  :key="index"
                >
                  <div class="item_cont" @click="openOption(item)">
                    <p class="item_cont_title">{{ item.name }}</p>
                    <p class="item_cont_option">
                      {{ item.answer }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import caseOption from "../edit/caseOption";
import caseHeader from "../edit/caseHeader";
export default {
  name: "edit-hear",
  data() {
    return {
      tab: ["闻诊"],
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
      typeId: "",
      optionShow: false,
      radioName: "",
      caseData: {},
      caseId: "",
      listenData: {},
    };
  },
  components: {
    caseOption,
    caseHeader,
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getcasedata();
    this.getListenData();
  },
  methods: {
    openOption(e) {
      this.option = e;
      this.optionShow = true;
    },
    getcasedata() {
      this.axios.get(`/case/${this.caseId}`).then((res) => {
        this.caseData = res.data;
        this.caseData.diseaseTypeName = this.list[res.data.diseaseType].name;
      });
    },
    getListenData() {
      this.axios.get(`/case/manage/${this.caseId}/listen`).then((res) => {
        this.listenData = res.data;
      });
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/listen/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[0].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.getListenData();
          }
        });
    },
  },
};
</script>

<style lang="scss">
.case_hear {
  .case_left {
    width: 1685px;
    header {
      width: 1140px;
    }
    main {
      .item_cont_border {
        border: 1px solid rgb(9, 124, 168);
        border-top: none;
        .item_cont {
          .item_cont_title {
            width: 400px;
            border-right: rgb(9, 124, 168) 1px solid;
          }
          .item_cont_option {
            cursor: pointer;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>