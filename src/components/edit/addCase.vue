<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">新增案例</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">姓名:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入姓名"
            v-model="upData.name"
            @change="changeName"
          />
          <p class="edit_tips">{{ nameText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">性别:</span>
          </div>
          <input
            class="edit_radio"
            type="radio"
            value="false"
            name="sex"
            v-model="gender"
          />
          <label for class="edit_off">女</label>
          <input
            class="edit_radio"
            type="radio"
            value="true"
            name="sex"
            v-model="gender"
          />
          <label for class="edit_off">男</label>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年龄:</span>
          </div>
          <input
            type="text"
            class="text_box"
            placeholder="请输入年龄"
            v-model="upData.age"
            @change="changeAge"
          />
          <p class="edit_tips">{{ ageText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">病系:</span>
          </div>
          <select
            class="select"
            v-model="upData.diseaseType"
            @change="changeType"
          >
            <option :value="selected">请选择病系</option>
            <option v-for="(item, index) in list" :key="index" :value="item.id">
              {{ item.name }}
            </option>
          </select>
          <p class="edit_tips">{{ diseaseTypeText }}</p>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-case",
  props: ["list"],
  data() {
    return {
      upData: {},
      selected: undefined,
      gender: "false",
      nameText: "",
      ageText: "",
      diseaseTypeText: "",
    };
  },
  methods: {
    close() {
      this.upData = {};
      this.$parent.addCase = false;
      this.$parent.mask = false;
    },
    changeName() {
      if (!this.upData.name) {
        this.nameText = "请输入姓名";
        return false;
      }
      this.nameText = "";
      return true;
    },
    changeAge() {
      if (!this.upData.age) {
        this.ageText = "请输入年龄";
        return false;
      }
      if (!/^\d{0,2}$/.test(this.upData.age)) {
        this.ageText = "请输入1到2位数字";
        return false;
      }
      this.ageText = "";
      return true;
    },
    changeType() {
      if (!this.upData.diseaseType) {
        this.diseaseTypeText = "请选择病系";
        return false;
      }
      this.diseaseTypeText = "";
      return true;
    },
    submit() {
      if (this.changeName() && this.changeAge() && this.changeType()) {
        this.http
          .post("/case/manage", {
            name: this.upData.name,
            age: this.upData.age,
            diseaseType: this.upData.diseaseType,
            gender: this.gender,
          })
          .then((res) => {
            if (res.code == "000000") {
              localStorage.setItem("caseId", res.data);
              this.$router.push("/case");
            } else {
              this.$Message.error(res.msg);
            }
          });
      }
    },
  },
};
</script>