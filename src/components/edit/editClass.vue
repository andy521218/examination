<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">{{ tips ? "编辑" : "新建" }}班级</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">院/系:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{
            editData.departmentName
          }}</span>
          <select class="select" v-model="upData.did" v-else>
            <option
              :value="item.id"
              v-for="(item, index) in departmentsData"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>

          <!-- <p class="edit_tips">1111111111111</p> -->
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">专业:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{
            editData.specialtyName
          }}</span>
          <select v-else class="select" v-model="upData.sid">
            <option
              :value="item.id"
              v-for="(item, index) in specialtyData"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
          <!-- <p class="edit_tips">1111111111111</p> -->
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年级:</span>
          </div>
          <span class="edit_text_i" v-if="tips">{{ editData.gradeName }}</span>
          <select v-else class="select" v-model="upData.gradeId">
            <option
              :value="item.id"
              v-for="(item, index) in gradeData"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
          <!-- <p class="edit_tips">1111111111111</p> -->
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="upData.name"
            placeholder="请输入班级名称"
          />
          <p class="edit_tips"></p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级状态:</span>
          </div>
          <input
            class="edit_radio"
            type="radio"
            v-model="status"
            value="true"
          />
          <label for class="edit_off">正常</label>
          <input
            class="edit_radio"
            type="radio"
            v-model="status"
            value="false"
          />
          <label for class="edit_off">禁用</label>
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
  name: "edit-class",
  props: ["specialtyData", "gradeData", "departmentsData", "editData", "tips"],
  data() {
    return {
      title: true,
      upData: {},
      status: "true",
    };
  },
  mounted() {
    if (this.tips) {
      this.upData = this.editData;
      this.upData.did = this.editData.departmentId;
      this.upData.sid = this.editData.specialtyId;
    }
  },
  methods: {
    close() {
      this.upData = {};
      this.$parent.tips = true;
      this.$parent.editClass = false;
    },
    submit() {
      var methods = "put";
      var url = this.upData.id;
      if (!this.upData.departmentId) {
        methods = "post";
        url = "";
        if (!this.upData.did) return this.$Message.error("请选择院/系");
        if (!this.upData.sid) return this.$Message.error("请选择专业");
        if (!this.upData.gradeId) return this.$Message.error("请选择年级");
        if (!this.upData.name) return this.$Message.error("请输入班级名称");
      }
      this.axios[methods](
        `/classrooms/${url}?${this.qs.stringify({
          did: this.upData.did,
          name: this.upData.name,
          gradeId: this.upData.gradeId,
          sid: this.upData.sid,
          status: this.status,
        })}`
      ).then((res) => {
        if (res.code == "000000") {
          this.close();
          this.$emit("getData");
          this.$Message.warning("添加班级成功!");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
};
</script>

