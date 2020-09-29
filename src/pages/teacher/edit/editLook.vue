<template>
  <div class="case_look">
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
            <i class="tips" @click="opneTips"></i>
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
      <div class="case_right">
        <div class="case_right_title">
          <span>添加图片</span>
        </div>
        <div class="case_right_cont">
          <div class="case_right_cont_upload">
            <div class="case_right_cont_upload_img">
                <img src="../../../assets/public/uploadImg.png" alt="">
                <span>请选择图片</span>
            </div>
            <input type="file">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import caseOption from "../edit/caseOption";
export default {
  name: "edit-look",
  components: {
    caseOption,
  },
  data() {
    return {
      tab: ["望神色形态", "望局部", "望舌"],
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
      route: "",
      optionShow: false,
      optionTitle: "",
    };
  },
  methods: {
    container(i) {
      this.tabIndex = i;
    },
    opneTips() {
      this.tips = true;
    },
    openOption(title) {
      this.optionTitle = title;
      this.optionShow = true;
    },
  },
};
</script>

<style lang="scss">
.case_look {
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
  .case_right_cont {
    width: 100%;
    height: 515px !important;
    border: 1px solid rgb(9, 124, 168);

    .case_right_cont_upload {
      position: relative;
      width: 80px;
      height: 80px;
      left: 50%;
      top: 50%;
      margin-left: -40px;
      margin-top: -40px;
      input{
        width: 80px;
        height: 80px;
        position: absolute;
        opacity: 0;
      }
      .case_right_cont_upload_img{
        position: absolute;
        width: 80px;
        height: 80px;
        display: flex;
        align-content: center;
        align-items: center;
        flex-direction: column;
        span{
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
