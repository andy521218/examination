<template>
  <div class="name diagnosis">
    <div class="cont_bg">
      <!-- 添加病名 -->
      <div class="edit" v-if="nameShow">
        <div class="edit_teacher">
          <div class="edit_title">
            <span class="title">添加病名</span>
            <span class="edit_switch" @click="colseName"></span>
          </div>
          <ul>
            <li>
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">名称:</span>
              </div>
              <input
                type="text"
                class="text_box"
                placeholder="请输入病名"
                v-model="name"
              />
              <p class="edit_tips"></p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_cancel" @click="colseName">取消</button>
            <button class="edit_submit" @click="submitName">确定</button>
          </div>
        </div>
      </div>
      <!-- 添加症型 -->
      <div class="edit" v-if="diseaseShow">
        <div class="edit_teacher">
          <div class="edit_title">
            <span class="title">{{ diseaseName ? "编辑" : "添加" }}症型</span>
            <span class="edit_switch" @click="colseDisease"></span>
          </div>
          <ul>
            <li>
              <div class="edit_left">
                <span class="edit_red">*</span>
                <span class="edit_text">症型:</span>
              </div>
              <input
                type="text"
                class="text_box"
                placeholder="请输入症型"
                v-model="diseaseName"
              />
              <p class="edit_tips"></p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_cancel" @click="colseDisease">取消</button>
            <button class="edit_submit" @click="submitDisease">确定</button>
          </div>
        </div>
      </div>
      <div class="mask" v-if="mask"></div>
      <div class="cont_header">病名症型</div>
      <ul>
        <li v-for="(item, index) in nameData" :key="index">
          <div class="item_cont" @click="tabShow(item, index)">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
            <div
              class="item_right"
              :class="{ transform: showIndex == index }"
            ></div>
          </div>
          <div class="item_container" :class="{ active: showIndex == index }">
            <div
              class="item_container_between"
              v-for="(i, index) in diseaseData"
              :key="index"
              v-show="diseaseData"
            >
              <p>{{ i.name }}</p>
              <div>
                <span @click="addDisease(item)">添加症型</span>
                <span @click="editDisease(item, i)">编辑</span>
              </div>
            </div>
            <div class="item_container_between">
              <p></p>
              <div v-show="!diseaseData">
                <span @click="addDisease(item)">添加症型</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addName()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "name-diagnosis",
  data() {
    return {
      nameData: {},
      showIndex: "",
      diseaseData: {},
      nameShow: false,
      mask: false,
      diseaseShow: false,
      name: "",
      diseaseName: "",
      nameId: "",
      diseaseId: "",
    };
  },
  mounted() {
    this.getNamedata();
  },
  methods: {
    getNamedata() {
      this.axios.get(`/meta/disease/name`).then((res) => {
        this.nameData = res.data;
      });
    },
    tabShow(e, index) {
      this.showIndex = index;
      this.axios.get(`/meta/disease/${e.id}`).then((res) => {
        this.diseaseData = res.data.rows;
      });
    },
    // 症型
    colseDisease() {
      this.diseaseName = "";
      this.mask = false;
      this.diseaseShow = false;
    },
    submitDisease() {
      if (!this.diseaseName) {
        this.axios
          .post(`/meta/disease/${this.nameId}`, {
            name: this.diseaseName,
          })
          .then((res) => {
            if (res.code == "000000") {
              this.colseDisease();
              let id = {
                id: this.nameId,
              };
              this.tabShow(id);
            }
          });
      }
      this.axios
        .put(
          `/meta/disease/${this.nameId}/${this.diseaseId}?${this.qs.stringify({
            name: this.diseaseName,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("更改症型成功!");
            this.colseDisease();
            let id = {
              id: this.nameId,
            };
            this.tabShow(id);
          }
        });
    },
    addDisease(e) {
      this.nameId = e.id;
      this.mask = true;
      this.diseaseShow = true;
    },
    editDisease(item, e) {
      this.mask = true;
      this.diseaseShow = true;
      this.diseaseName = e.name;
      this.nameId = item.id;
      this.diseaseId = e.id;
    },
    // 病名
    colseName() {
      this.mask = false;
      this.nameShow = false;
      this.name = "";
    },
    submitName() {
      if (!this.name) return this.$Message.error("请填写病名");
      this.axios
        .post(`/meta/disease/name`, {
          name: this.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.colseName();
            this.getNamedata();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    addName() {
      this.mask = true;
      this.nameShow = true;
    },
  },
};
</script>

<style lang="scss">
.name {
  .cont_bg {
    ul {
      li {
        border: none;
        .editCurr {
          cursor: pointer;
          color: rgb(0, 235, 255);
          height: 40px;
          line-height: 41px;
        }
      }
    }
    border: none;
    .cont_header {
      width: 600px;
    }
    .edit {
      left: 50%;
      margin-left: -235px;
    }
  }
}
</style>