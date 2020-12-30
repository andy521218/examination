<template>
  <div class="view_records">
    <div class="edit">
      <div class="edit_title">
        <span class="title">学习记录</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <div class="records_bottom scrollbar">
        <ul class="records_header">
          <li class="table_smal">病系</li>
          <li class="table_smal">患者</li>
          <li class="table_big">开始时间</li>
          <li class="table_big">完成时间</li>
          <li class="table_smal">用时</li>
          <li class="table_smal">成绩</li>
        </ul>
        <ul class="records_cont">
          <li v-for="(item, index) in recordData.rows" :key="index">
            <p class="table_smal">
              {{ diseType(item.diseaseType) }}
            </p>
            <p class="table_smal">
              {{ item.name }}
            </p>
            <p class="table_big">
              {{ item.beginTime | lastTime(item.beginTime) }}
            </p>
            <p class="table_big">
              {{ item.endTime | lastTime(item.endTime) }}
            </p>
            <p class="table_smal">{{ item.duringTime / 60 }}min</p>
            <p class="table_smal">{{ Math.round(item.score) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "view-records",
  props: ["recordData"],
  data() {
    return {
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
    };
  },
  methods: {
    close() {
      this.$parent.recordshow = false;
    },
    diseType(index) {
      return this.list[index - 1].name;
    },
  },
};
</script>

<style lang="scss">
.view_records {
  .edit {
    margin-left: 11%;
    width: 1224px;
  }
  .records_bottom {
    text-align: center;
    .table_smal {
      width: 183px;
    }
    .table_big {
      width: 245px;
    }
    .records_header {
      width: 97%;
      margin: 0 auto;
      display: flex;
    }
    .records_cont {
      width: 100%;
      margin: 0 auto;
      height: 500px;
      overflow-y: auto;
      margin-bottom: 15px;
      width: 97%;
      li {
        margin-top: 8px;
        width: 100%;
        display: flex;
        height: 45px;
        line-height: 45px;
      }
      li:nth-child(odd) {
        background: rgb(26, 127, 195, 0.2);
      }
      li:nth-child(even) {
        background: rgb(10, 40, 72);
      }
    }
  }
}
</style>
