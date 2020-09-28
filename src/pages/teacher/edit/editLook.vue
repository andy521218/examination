<template>
  <div class="case_layout"> 
    <!-- 编辑弹窗 -->
    <case-problem v-if="edit_cont"></case-problem>
    <!-- 提示弹窗 -->
    <tips v-if="tips"></tips>
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
              <li>
                <div class="item_cont">
                  <i></i>
                  <span>问:您好,您叫什么名字?</span>
                  <span>答:张三问:您好,您叫什么名字?</span>
                </div>
                <div class="item_edit">
                  <i class="icon_edit" @click="openCont()"></i>
                  <i class="icon_dele"></i>
                </div>
              </li>
              <li>
                <div class="item_cont">
                  <i></i>
                  <span>问:您好,您叫什么名字?</span>
                  <span>答:张三问:您好,您叫什么名字?</span>
                </div>
                <div class="item_edit">
                  <i class="icon_edit"></i>
                  <i class="icon_dele"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="content_bottom">
          <input type="checkbox" />
          <label for="">干扰项</label>
          <input type="text" class="text_box" />
          <input type="text" class="text_box" />
          <button class="submit">添加</button>
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
import tips from "../edit/tips";
export default {
  name: "edit-look",
  components: {
    caseProblem,
    tips,
  },
  data() {
    return {
      tab: ["主诉", "现病史", "疾病史", "个人史", "婚育史", "家族史"],
      tabIndex: "",
      route: "",
      edit_cont: false,
      tips: false,
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
  },
};
</script>
