<template>
  <div class="case_hear">
    <case-option :optionTitle="optionTitle" v-if="optionShow"></case-option>
    <div class="case_layout">
      <div class="case_left">
        <header>
          <img src="../../../assets/public/timg1.jpg" alt="" />
          <ul>
            <li>
              <span>姓名:</span>
              <span>张三</span>
            </li>
            <li>
              <span>病系:</span>
              <span>肝病系</span>
            </li>
            <li>
              <span>性别:</span>
              <span>女</span>
            </li>
            <li>
              <span>年龄:</span>
              <span>75岁</span>
            </li>
            <li>
              <span>工作:</span>
              <span>退休人员</span>
            </li>
          </ul>
        </header>
        <main>
          <ul class="main_tab">
            <li
              v-for="(item, index) in tab"
              :key="index"
              class="item_title"
              @click="container(index)"
            >
              {{ item }}
              <div :class="{ active: tabIndex == index }"></div>
            </li>
            <i class="tips"></i>
          </ul>
          <div class="content scrollbar">
            <div class="content_scrollbar">
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <div class="item_cont">
                    <p class="item_cont_title">{{ item.title }}</p>
                    <p class="item_cont_option" @click="openOption(item.title)">
                      {{ item.option }}
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
export default {
  name: "edit-hear",
  data() {
    return {
      tab: ["闻诊"],
      list: [
        {
          title: "语言",
          option: "正常",
        },
        {
          title: "呼吸",
          option: "急促",
        },
        {
          title: "失音",
          option: "淡白",
        },
      ],
      tabIndex: "",
      optionTitle: "",
      optionShow: false,
    };
  },
  components: {
    caseOption,
  },
  methods: {
    openOption(title) {
      this.optionShow = true;
      this.optionTitle = title;
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