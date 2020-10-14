<template>
  <div class="prescription diagnosis">
    <!-- 左侧内容 -->
    <div class="cont_bg">
      <!-- 左侧弹窗 -->
      <div class="mask" v-if="drug"></div>
      <div class="edit" v-if="drug">
        <div class="edit_title">
          <span class="title">添加常见方剂</span>
          <span class="edit_switch" @click="closeDrug()"></span>
        </div>
        <ul class="edit_class" ref="list">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入方剂名称"
              v-model="prescription.description"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
          <li v-for="(item, index) in addArr" :key="index">
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂组成:</span>
            </div>
            <input type="text" class="text_box" style="width: 240px" />
            <p class="edit_tips">
              <img
                src="../../../assets/public/dele.png"
                alt=""
                :data-num="item"
                @click="dele($event)"
              />
            </p>
          </li>
        </ul>
        <i class="addList" @click="add()">+</i>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="closeDrug()">取消</button>
          <button class="edit_submit" @click="submitPrescription()">
            确定
          </button>
        </div>
      </div>
      <div class="cont_header">常见方剂</div>
      <ul>
        <li class="display">
          <input type="text" class="text_box" />
          <button class="submit">检索</button>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>查看</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>查看</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>查看</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addDrug()">+</button>
    </div>
    <!-- 右侧内容 -->
    <div class="cont_bg">
      <!-- 右侧弹窗 -->
      <div class="mask" v-if="prescriptionShow"></div>
      <div class="edit" v-if="prescriptionShow">
        <div class="edit_title">
          <span class="title">添加常见方药</span>
          <span class="edit_switch" @click="closePrescription()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方药名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              placeholder="请输方药名称"
              v-model="name"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="closePrescription()">取消</button>
          <button class="edit_submit" @click="submitName()">确定</button>
        </div>
      </div>
      <div class="cont_header">常见方药</div>
      <ul>
        <li class="display">
          <input
            type="text"
            class="text_box"
            v-model="nameSearch"
            @blur="searchShow = false"
            @focus="
              searchShow = true;
              nameSearchData = '';
            "
          />
          <button class="submit">检索</button>
          <div class="search_box" v-show="searchShow">
            <div v-for="(item, index) in nameSearchData" :key="index">
              {{ item.name }}
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left" style="display: flex">
              <div
                style="margin-left: 5px"
                v-for="(item, index) in nameData"
                :key="index"
              >
                <i></i>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addPrescription()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "prescription-diagnosis",
  data() {
    return {
      prescriptionShow: false,
      drug: false,
      prescription: {},
      name: "",
      nameData: "",
      nameSearch: "",
      nameSearchData: "",
      searchShow: false,
      addArr: ["1"],
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    closePrescription() {
      this.prescriptionShow = false;
    },
    addPrescription() {
      this.prescriptionShow = true;
    },
    closeDrug() {
      this.drug = false;
    },
    addDrug() {
      this.drug = true;
    },
    add() {
      this.addArr.push(this.addArr.length + 1);
    },

    dele(e) {
      let li = e.target.parentNode.parentNode;
      this.$refs.list.removeChild(li);
    },
    getName() {
      this.axios.get("/meta/druggery").then((res) => {
        this.nameData = res.data.rows;
      });
    },
    submitName() {
      if (!this.name) return this.$Message.warning("方药名称不能为空");
      this.axios
        .post(
          "/meta/druggery",
          JSON.stringify({
            name: this.name,
          }),
          {
            headers: { "Content-Type": " application/json" },
            transformRequest: [
              function (data) {
                return data;
              },
            ],
          }
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            this.drug = false;
          }
        })
        .catch(() => {
          this.$Message.error("遇到未知错误,请稍后再试!");
        });
    },
  },
  watch: {
    nameSearch: function () {
      this.axios
        .get("/meta/druggery", {
          params: {
            name: this.nameSearch,
          },
        })
        .then((res) => {
          this.nameSearchData = res.data.rows;
        });
    },
  },
};
</script>
<style lang="scss">
.prescription {
  .edit_btn_box {
    margin-top: 70px;
  }
  .cont_bg {
    width: 47%;
    .edit {
      top: 45px;
      left: 50%;
      margin-left: -235px;
      .select {
        width: 235px;
      }
      li {
        border: none;
      }
    }
    .display {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      border-bottom: none;
      margin-bottom: 10px;
      position: relative;
      .search_box {
        position: absolute;
        top: 39px;
        width: 100%;
        background-color: rgb(5, 61, 118);
        border: rgb(9, 124, 168) 1px solid;
      }
      button {
        width: 115px;
      }
      input {
        width: 500px;
      }
    }
    .flex {
      display: flex;
      span {
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: rgb(8, 75, 130);
        color: rgb(255, 255, 255);
        padding: 10px;
        width: 265px;
        height: 185px;
      }
      textarea::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgb(255, 255, 255);
      }

      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgb(255, 255, 255);
      }

      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgb(255, 255, 255);
      }

      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(255, 255, 255);
      }
    }
    li {
      // height: 40px;
      .edit_tips {
        width: 20px;
        height: 30px;
        right: 62px;
        top: 8px;
        display: inline-block;
        img {
          width: 20px;
          height: 24px;
        }
      }
      .edit_tips:hover {
        border-bottom: 2px solid rgb(255, 0, 0);
      }
    }
    .addList {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 30px;
      background: rgb(8, 75, 130);
      border: rgb(9, 124, 168) 1px solid;
      float: right;
      margin-right: 68px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .addList:hover {
      cursor: pointer;
      color: rgb(0, 235, 255);
    }
  }
}
</style>