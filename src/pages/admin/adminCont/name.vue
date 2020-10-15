<template>
  <div class="name diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="show"></div>
      <div class="edit" v-if="show">
        <div class="edit_title">
          <span class="title">添加病名</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">病名:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入病名"
              v-model="name"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="editSwitch()">取消</button>
          <button class="edit_submit" @click="submitName">确定</button>
        </div>
      </div>
      <!-- 左侧内容 -->
      <div class="cont_header">病名</div>
      <ul>
        <li v-for="(item, index) in nameData" :key="index">
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addName()">+</button>
    </div>

    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="symptomShow"></div>
      <div class="edit" v-if="symptomShow">
        <div class="edit_title">
          <span class="title">添加症型</span>
          <span class="edit_switch" @click="closeSymptom()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">病名:</span>
            </div>
            <select class="select" v-model="symptom.id">
              <option value="">请选择</option>
              <option
                v-for="(item, index) in nameData"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">症型:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-model="symptom.name"
              placeholder="请输入症型,以逗号分隔"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="closeSymptom()">取消</button>
          <button class="edit_submit" @click="submitSymptom()">确定</button>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="cont_header">症型</div>
      <ul>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addSymptom()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "name-diagnosis",
  data() {
    return {
      show: false,
      symptomShow: false,
      name: "",
      nameData: "",
      symptom: {},
      symptomData: "",
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    editSwitch() {
      this.show = false;
    },
    addName() {
      this.show = true;
    },
    closeSymptom() {
      this.symptomShow = false;
    },
    addSymptom() {
      this.symptomShow = true;
    },
    getName() {
      this.axios.get("/meta/disease/name").then((res) => {
        if (res.code == "000000") {
          this.nameData = res.data;
        }
      });
    },
    submitName() {
      if (!this.name) return this.$Message.warning("请输入病名");
      this.axios
        .post("/meta/disease/name", {
          name: this.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.show = false;
            this.getName();
            this.$Message.warning("添加成功!");
          }
        })
        .catch(() => {
          this.$Message.error("遇到未知错误!");
        });
    },

    submitSymptom() {
      if (!this.symptom.id) return this.$Message.warning("请选择病名");
      if (!this.symptom.name) return this.$Message.warning("请选择症型");
      this.axios
        .post(`/meta/disease/${this.symptom.id}`, {
          id: this.symptom.id,
          name: this.symptom.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.show = false;
            this.$Message.warning("添加成功!");
          }
        })
        .catch(() => {
          this.$Message.error("遇到未知错误!");
        });
    },
  },
};
</script>

<style lang="scss">
.name {
  .cont_bg {
    width: 40%;
    .edit {
      top: 45px;
      left: 50%;
      margin-left: -235px;
      li {
        border: none;
      }
    }
  }
}
</style>