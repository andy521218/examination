<template>
  <div class="train_analysis">
    <div class="main_header">
      <label for>病系</label>
      <select class="select" v-model="diseaseType">
        <option :value="item.id" v-for="(item, index) in list" :key="index">
          {{ item.name }}
        </option>
      </select>
      <button class="submit" @click="getTrain(1)">检索</button>
    </div>
    <div class="main_table">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th>序号</th>
            <th>病系</th>
            <th>病人姓名</th>
            <th>学习人数</th>
            <th>学习人次</th>
            <th>最高分</th>
            <th>平均分</th>
            <th>平均用时</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in trainData" :key="index">
            <td>{{ index | sortNumber(page) }}</td>
            <td>{{ item.diseaseType }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.totalUser }}</td>
            <td>{{ item.totalCnt }}</td>
            <td>{{ parseInt(item.maxScore) }}</td>
            <td>{{ parseInt(item.avgScore) }}</td>
            <td>{{ parseInt(item.avgCostTime) }}</td>
          </tr>
        </tbody>
      </table>
      <turn-page
        v-show="total > 10"
        :totaltotal="Number(total)"
        :size="10"
        @getData="getTrain"
      ></turn-page>
    </div>
  </div>
</template>

<script>
import turnPage from "../../../components/turnPage";
export default {
  name: "train-analysis",
  components: {
    turnPage,
  },
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
      page: "1",
      total: "",
      diseaseType: "1",
      trainData: {},
    };
  },
  mounted() {
    this.getTrain();
  },
  methods: {
    getTrain(page = "1") {
      this.page = page;
      this.axios
        .get("/case/report/train", {
          params: {
            diseaseType: this.diseaseType,
            size: "10",
            page: this.page,
          },
        })
        .then((res) => {
          this.trainData = res.data.rows;
          this.total = res.data.total;
        });
    },
  },
};
</script>

<style lang="scss">
.train_analysis {
  width: 100%;
  height: 100%;
  .main_header {
    justify-content: flex-end;
  }
}
</style>