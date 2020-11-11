<template>
  <div class="user_record">
    <div class="main_header">
      <label for>分类</label>
      <select name id class="select" v-model="diseaseType">
        <option value="">请选择</option>
        <option :value="item.id" v-for="(item, index) in list" :key="index">
          {{ item.name }}
        </option>
      </select>
      <input
        type="text"
        class="text_box"
        placeholder="请输入患者名字"
        v-model="searchName"
      />
      <button class="submit" @click="getTrain(page)">检索</button>
    </div>
    <div class="main_table">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th class="table_5">序号</th>
            <th class="table_10">病系</th>
            <th class="table_10">患者</th>
            <th class="table_10">开始时间</th>
            <th class="table_10">完成时间</th>
            <th class="table_10">用时</th>
            <th class="table_10">成绩</th>
            <th class="table_10">查看</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in trainData" :key="index">
            <td>{{ index | sortNumber(page) }}</td>
            <td>{{ checkDisease(item.diseaseType) }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.beginTime | lastTime(item.beginTime) }}</td>
            <td>{{ item.endTime | lastTime(item.endTime, "未完成") }}</td>
            <td>{{ item.endTime | duringTime(item.beginTime) }}</td>
            <td>{{ Math.round(item.score) }}分</td>
            <td v-show="item.status == 1">
              <span @click="toKeep(item)">继续学习</span>
            </td>
            <td v-show="item.status == 2">
              <span @click="toStudy(item)">辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getTrain"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
  name: "user-record",
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
      diseaseType: "",
      searchName: "",
      total: "",
      size: "10",
      trainData: {},
      page: "",
    };
  },
  components: {
    turnPage,
  },
  mounted() {
    this.getTrain(1);
  },
  methods: {
    toKeep(e) {
      this.axios.get(`/answer/${e.examNo}/${e.caseId}/asked`).then((res) => {
        localStorage.setItem("askedArr", JSON.stringify(res.data));
        localStorage.setItem("examNo", e.examNo);
        localStorage.setItem("caseId", e.caseId);
        this.$router.push("userask");
      });
    },
    toStudy(e) {
      localStorage.setItem("examNo", e.examNo);
      localStorage.setItem("caseId", e.caseId);
      this.$router.push("userstudy");
    },
    getTrain(page) {
      this.page = page;
      this.axios
        .get("/my/train", {
          params: {
            diseaseType: this.diseaseType,
            fuzzyName: this.searchName,
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.trainData = res.data.rows;
          this.total = res.data.total;
        });
    },
    checkDisease(type) {
      switch (type) {
        case 1:
          return "心系病";

        case 2:
          return "肝系病";

        case 3:
          return "脾胃病";

        case 4:
          return "肺系病";

        case 5:
          return "肾系病";
      }
    },
  },
};
</script>

<style lang="scss">
.user_record {
  .main_header {
    justify-content: flex-end;
    .select {
      width: 245px;
    }
    input {
      width: 295px;
    }
    .submit {
      border-radius: 3px;
      margin-right: 20px;
      width: 115px;
    }
    .select,
    input {
      margin-right: 50px;
    }
    label {
      margin-right: 10px;
    }
  }
  .main_table {
    .table_number {
      width: 10%;
    }
    span {
      cursor: pointer;
      margin-right: 10px;
      color: rgb(0, 235, 255);
    }
    td span:hover {
      border-bottom: 1px solid rgb(0, 235, 255);
    }
  }
}
</style>