<template>
  <div class="case_look">
    <div
      class="main_mask"
      v-show="mask"
      style="height: 730px; width: 87.5%"
    ></div>
    <case-option
      :option="option"
      v-if="optionShow"
      @editcaseData="editcaseData"
    ></case-option>
    <div class="case_layout">
      <div class="case_left">
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
              <ul>
                <li><p>点击右侧空白处选择一个设置为正确选项:</p></li>
                <li
                  class="item_cont_border"
                  v-for="(item, index) in watchData"
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
      <div class="case_right">
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
      tab: ["望神色形态", "望局部", "望舌"],
      caseId: "",
      imgs: "",
      typeId: "0",
      route: "",
      optionShow: false,
      option: "",
      watchData: "",
      imgurl: "",
      mask: false,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getwatchdata();
    this.radioData = this.option.answer;
  },
  methods: {
    container(i) {
      this.typeId = i;
      this.getwatchdata();
    },

    opneTips() {
      this.tips = true;
    },
    openOption(e) {
      this.option = e;
      this.optionShow = true;
      this.mask = true;
    },
    importimg() {
      this.imgs = this.$refs.imgs.files[0];

      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.imgs);
      fileExample.onload = (ev) => {
        this.imgurl = ev.target.result;
      };

      let imgsData = new window.FormData();
      imgsData.append("file", this.imgs);

      this.upload.post("/upload", imgsData).then((res) => {
        let url = res.data;
        this.axios
          .put(
            `/case/manage/${this.caseId}/watch/${
              this.typeId
            }/pic?${this.qs.stringify({ url: url })}`
          )
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("操作成功!");
            } else {
              alert("添加失败,请刷新查看结果!");
            }
          });
      });
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/watch/${this.typeId}/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[1].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.mask = false;
            this.getwatchdata();
          }
        });
    },
    getwatchdata() {
      this.axios
        .get(`/case/manage/${this.caseId}/watch/${this.typeId}`)
        .then((res) => {
          this.watchData = res.data.list;
          if (/localhost/.test(res.data.url)) {
            this.imgurl = res.data.url.replace(/localhost/, "101.132.150.87");
          } else {
            this.imgurl = this.$url + res.data.url;
          }
        });
    },
  },
};
</script>
