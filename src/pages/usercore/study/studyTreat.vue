<template>
  <div class="study_treat">
    <div class="study_title">
      <span>治疗</span>
      <div v-for="(item, index) in list" :key="index">
        <input
          type="radio"
          name="Feel"
          :value="item.id"
          v-model="typeId"
          @click="seeFeel(item)"
        />
        <label for="">{{ item.name }}</label>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 48%; padding-left: 10px">问题</span>
        <span style="width: 48%">正确答案</span>
        <span style="width: 4%"></span>
      </li>
    </ul>
    <ul class="study_main_item">
      <li style="height: 40px">
        <span style="width: 48%; padding-left: 10px">华脉</span>
        <span style="width: 48%">正确</span>
        <span style="width: 4%; height: 20px" class="options">
          <i class="right" v-show="0"></i>
          <i class="error" v-show="1"></i
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "study-treat",
  data() {
    return {
      list: [
        { id: 1, name: "治则治法" },
        { id: 2, name: "遣方用药" },
        { id: 3, name: "药物组成" },
      ],
      typeId: "1",
    };
  },
  methods: {
    seeFeel(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="scss">
.study_treat {
  .study_title {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    span {
      font-size: 20px;
    }
    input {
      margin-left: 10px;
    }
    label {
      margin-right: 15px;
    }
  }
}
</style>