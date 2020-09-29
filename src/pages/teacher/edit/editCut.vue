<template>
  <div class="case_cut">
    <div class="case_layout">
      <div class="case_left" style="width: 1000px">
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
              <ul v-show="tabIndex == 0">
                <li style="border: none">
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <div class="item_cont">
                    <input
                      type="radio"
                      name="option"
                      style="margin-right: 20px"
                    />
                    <p class="item_cont_title">{{ item.title }}</p>
                  </div>
                </li>
              </ul>
              <ul v-show="tabIndex == 1">
                <li>
                  <p>点击右侧空白处选择一个设置为正确选项:</p>
                </li>
                <li
                  style="border: 1px solid rgb(9, 124, 168); border-top: none"
                >
                  <div class="item_cont">
                    <span
                      style="
                        width: 200px;
                        border-right: 1px solid rgb(9, 124, 168);
                      "
                      >左胸</span
                    >
                    <span>疼痛</span>
                  </div>
                  <div class="item_edit">
                    <input type="checkbox" />
                  </div>
                </li>
                <li
                  style="border: 1px solid rgb(9, 124, 168); border-top: none"
                >
                  <div class="item_cont">
                    <span
                      style="
                        width: 200px;
                        border-right: 1px solid rgb(9, 124, 168);
                      "
                      >左胸</span
                    >
                    <span>疼痛</span>
                  </div>
                  <div class="item_edit">
                    <input type="checkbox" />
                  </div>
                </li>
                <li
                  style="border: 1px solid rgb(9, 124, 168); border-top: none"
                >
                  <div class="item_cont">
                    <span
                      style="
                        width: 200px;
                        border-right: 1px solid rgb(9, 124, 168);
                      "
                      >左胸</span
                    >
                    <span>疼痛</span>
                  </div>
                  <div class="item_edit">
                    <input type="checkbox" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
      <div class="case_right" style="width: 620px">
        <div class="case_right_title">
          <span>脉诊图片</span>
        </div>
        <img v-show="tabIndex == 0" src="../../../assets/public/1.png" alt="" />
        <img v-show="tabIndex == 1" src="../../../assets/public/2.png" alt="" />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "edit-look",
  data() {
    return {
      tab: ["脉诊", "按诊"],
      list: [
        {
          title: "紧脉",
          option: "正常",
        },
        {
          title: "划脉",
          option: "急促",
        },
        {
          title: "散脉",
          option: "淡白",
        },
      ],
      tabIndex: "",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
    };
  },
  methods: {
    container(i) {
      this.tabIndex = i;
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
  },
};
</script>
<style lang="scss">
.case_cut {
  .case_right {
    img {
      border: 1px solid rgb(9, 124, 168);
      margin: 50px 19px;
    }
  }
}
</style>