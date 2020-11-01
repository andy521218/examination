<template>
  <div class="case_look">
    <case-option
      :option="option"
      :radioName="radioName"
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
      caseId: "",
      imgs: "",
      typeId: "0",
      route: "",
      optionShow: false,
      option: "",
      watchData: "",
      imgurl: "",
      caseData: {},
      radioName: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.getwatchdata();
    this.getcasedata();
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
        let url = `http://localhost:8080/api/download/${res.data}`;
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
            this.getwatchdata();
          }
        });
    },
    getcasedata() {
      this.axios.get(`/case/${this.caseId}`).then((res) => {
        this.caseData = res.data;
        this.caseData.diseaseTypeName = this.list[res.data.diseaseType].name;
      });
    },
    getwatchdata() {
      this.axios
        .get(`/case/manage/${this.caseId}/watch/${this.typeId}`)
        .then((res) => {
          this.watchData = res.data.list;
          this.imgurl = res.data.url;
        });
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
      height: 30px;
      line-height: 30px;
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
    position: relative;
    .userlogo {
      width: 100%;
      height: 100%;
    }
    .case_right_cont_upload {
      position: absolute;
      width: 80px;
      height: 80px;
      left: 50%;
      top: 50%;
      z-index: 99;
      margin-left: -40px;
      margin-top: -40px;
      input {
        width: 80px;
        height: 80px;
        position: absolute;
        opacity: 0;
      }
      .case_right_cont_upload_img {
        position: absolute;
        width: 80px;
        height: 80px;
        display: flex;
        align-content: center;
        align-items: center;
        flex-direction: column;
        span {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
